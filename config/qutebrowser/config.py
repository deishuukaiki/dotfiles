config.load_autoconfig(True)

# dark mode
# config.set("colors.webpage.darkmode.enabled", True)

# tabs
config.bind('<J>', 'tab-prev')
config.bind('<K>', 'tab-next')

# keepassxc extension
config.bind('pw', 'spawn --userscript qute-pass')

# scroll
config.bind('<j>', 'scroll-px 0 100')
config.bind('<k>', 'scroll-px 0 -100')
config.set('scrolling.smooth', True)

# aliases
c.aliases = {'q': 'quit', 'w': 'session-save', 'wq': 'quit --save'}

# cookies
config.set('content.cookies.accept', 'no-3rdparty')
config.set('content.cookies.store', True)

# user-agent
# config.set('content.headers.user_agent', 'Mozilla/5.0 ({os_info}) AppleWebKit/{webkit_version} (KHTML, like Gecko) {upstream_browser_key}/{upstream_browser_version} Safari/{webkit_version}')
# don't allow notifications
config.set('content.notifications.enabled', False)

# download dir
c.downloads.location.directory = '~/downloads'

# default pages
c.url.default_page = 'https://home.mantrasultry.xyz'
c.url.start_pages = 'https://home.mantrasultry.xyz'
c.url.searchengines = {'DEFAULT': 'https://searx.be/search?q={}'}

# fonts and colors
# c.fonts.default_family = '"Monospace"'
# c.fonts.default_size = '10pt'
# c.fonts.prompts = 'default_size sans-serif'
config.source('nord-qutebrowser.py')

# privacy
config.set('content.canvas_reading', False)
config.set('content.webgl', False)
config.set('content.headers.user_agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36')
config.set('content.headers.accept_language', 'en-US,en;q=0.5')
config.set('content.headers.custom', {"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"})

config.set('content.fullscreen.window', True)
