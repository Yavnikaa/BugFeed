from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter , URLRouter
import bugfeed.routing

application = ProtocolTypeRouter({

    'websocket':AuthMiddlewareStack(
        URLRouter(
            bugfeed.routing.websocket_urlpatterns
            )
        ),
})

