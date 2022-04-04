config.load_autoconfig(True)

# dark mode
# config.set("colors.webpage.darkmode.enabled", True)

# tabs
config.bind('<J>', 'tab-prev')
config.bind('<K>', 'tab-next')

# keepassxc extension
config.bind('<Alt-Shift-u>', 'spawn --userscript qute-keepassxc --key B24370B2', mode='insert')
config.bind('pw', 'spawn --userscript qute-keepassxc --key B24370B2', mode='normal')

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
c.url.default_page = 'http://home.mantrasultry.xyz'
c.url.start_pages = 'http://home.mantrasultry.xyz'
c.url.searchengines = {'DEFAULT': 'https://searx.be/search?q={}'}

# fonts and colors
# c.fonts.default_family = '"Monospace"'
# c.fonts.default_size = '10pt'
# c.fonts.prompts = 'default_size sans-serif'
config.source('nord-qutebrowser.py')

# privacy
config.set('content.canvas_reading', True)
config.set('content.webgl', False)

config.set('content.fullscreen.window', True)
