"""
URL configuration for dtechproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from dtechapp.views import home,tokenclass,myclass,genup,Loginuser,Tokens,Getview,Logout,Whishlist,getcontent,All_view,Likes,User_comments,Sing_Up,Send_feedback,Reset_password,Verify_link,Password_chnage,Share_product,Search_view,UserCommentsViewSet
from dtechapp.models import EVcars
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt import views as jwtviews

router = DefaultRouter()
router.register(r'your-model',UserCommentsViewSet, basename='your-model')

urlpatterns = [
    path('',home,name='home'),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls')),
    path('api-token-auth/',views.obtain_auth_token),
    path('log/',Tokens.as_view()),
    path('jwt/',jwtviews.TokenObtainPairView.as_view()),
    path('getdata/<id>/',Getview.as_view()),
    path('logout/',Logout.as_view()),
    path('wishlist/',Whishlist.as_view()),
    path('content/<categ>/<id>/',getcontent.as_view()),
    path('All_content/',All_view.as_view()),
    path('likes/<categ>/<id>/<str>/',Likes.as_view()),
    path('comment/<categ>/<id>/',User_comments.as_view()),
    path('sing_up/',Sing_Up.as_view()),
    path('o/',include('oauth2_provider.urls',namespace='oauth2_provider')),
    path('feedback/',Send_feedback.as_view()),
    path('Rest_password/',Reset_password.as_view()),
    path('verify_link/', Verify_link.as_view()),
    path('password_change/<str>/',Password_chnage.as_view()),
    path('share_product/',Share_product.as_view()),
    path('search/',Search_view.as_view())



]


urlpatterns +=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
urlpatterns +=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
