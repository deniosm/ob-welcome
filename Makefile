NAME=ob-welcome
VERSION=2.4.7
TRANSLATIONS=bs hr sr
bindir=/usr/bin
sysconfdir=/etc
sharedir=/usr/share
localedir=$(sharedir)/locale
clean:
	rm -rf $(DESTDIR)
all:

messages: usr/share/ob-welcome/translation
	xgettext -d ob-welcome -o usr/share/ob-welcome/ob-welcome.pot -L Shell --from-code utf-8 usr/share/ob-welcome/translation
	for i in $(TRANSLATIONS); do \
		msgmerge -U po/$$i.po usr/share/ob-welcome/ob-welcome.pot; \
	done

install: messages
	mkdir -p $(DESTDIR)$(prefix)/$(bindir)
	mkdir -p $(DESTDIR)$(prefix)/$(sysconfdir)/xdg/autostart
	mkdir -p $(DESTDIR)$(prefix)/$(sharedir)/$(NAME)
	mkdir -p $(DESTDIR)$(prefix)/$(sharedir)/applications
	mkdir -p $(DESTDIR)$(prefix)/$(localedir)
	install -m 644 ob-welcome.desktop $(DESTDIR)$(prefix)/$(sysconfdir)/xdg/autostart
	install -m 644 etc/skel/ob-welcome.desktop $(DESTDIR)$(prefix)/$(sharedir)/applications
	install -m 755 usr/bin/* $(DESTDIR)$(prefix)/$(bindir)
	cp -avx usr/share/$(NAME)/* $(DESTDIR)$(prefix)/$(sharedir)/$(NAME)
	chmod -R 755 $(DESTDIR)$(prefix)/$(sharedir)/$(NAME)
	@for l in $(TRANSLATIONS); do \
	mkdir -p  $(DESTDIR)$(prefix)/$(localedir)/$$l/LC_MESSAGES; \
	msgcat po/$$l.po | msgfmt -o $(DESTDIR)$(prefix)$(localedir)/$$l/LC_MESSAGES/ob-welcome.mo - ; \
	done

dist:
	git archive --format=tar --prefix=$(NAME)-$(VERSION)/ HEAD | xz -2vec -T0 > $(NAME)-$(VERSION).tar.xz;
	$(info $(NAME)-$(VERSION).tar.xz is ready)

# FIXME this shouldn't be necessary, there must be some way to convince
# transifex to send the right headers...
fix-translations:
	for i in po/*.po; do \
		if ! grep -q '"Content-Transfer-Encoding:' $$i; then \
			sed -i -e '/^"Language-Team/a"Content-Transfer-Encoding: 8bit\\n"' $$i; \
		fi; \
		if ! grep -q '"Content-Type:' $$i; then \
			sed -i -e '/^"Language-Team/a"Content-Type: text/plain; charset=UTF-8\\n"' $$i; \
		fi; \
		if ! grep -q '"MIME-Version:' $$i; then \
			sed -i -e '/^"Language-Team/a"MIME-Version: 1.0\\n"' $$i; \
		fi; \
	done
	sed -i -e 's/nplurals=3.*/nplurals=2; plural=(n > 1);\\n"/' po/it.po
