import web
from phue import Bridge

urls = (
	'/', 'index'
	)
bridge = Bridge('192.168.1.42', 'e9a353626dcf16710e53f9a2ae2407b')
bridge.get_api()

class index:
	def GET(self):
		render = web.template.render('')
		lights = bridge.get_light_objects('list')
		return render.index(lights)

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()