from django.contrib import admin
from .models import feedback,Search,userdata,mydata,postdata,whislist,Gadgets,user_likes,comments,Apps_websites,Games,EVbikes,EVcars,Technews
# Register your models here.
admin.site.register(feedback)
admin.site.register(userdata)
admin.site.register(mydata)
admin.site.register(postdata)
admin.site.register(whislist)
admin.site.register(Gadgets)
admin.site.register(user_likes)
admin.site.register(comments)
admin.site.register(Apps_websites)
admin.site.register(Games)
admin.site.register(EVcars)
admin.site.register(EVbikes)
admin.site.register(Technews)
admin.site.register(Search)