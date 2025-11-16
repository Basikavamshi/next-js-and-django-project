from typing import Iterable, Optional
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from datetime import datetime
# Create your models here.
class feedback(models.Model):
    username=models.CharField(max_length=10) 
    text=models.TextField()
class userdata(models.Model):
    owner=models.ForeignKey("auth.User", related_name='snippets',on_delete=models.CASCADE)
    highlited=models.TextField()
    user=models.ForeignKey('auth.user',related_name='usr',on_delete=models.CASCADE)
class mydata(models.Model):
    track=models.ForeignKey('auth.user',related_name='track',on_delete=models.CASCADE)
    bio=models.CharField(max_length=20)
    age=models.IntegerField()
    def __str__(self):
        return '%d: %s' % (self.age, self.bio)
    
class postdata(models.Model):
    category=models.IntegerField(default=0,choices=(
            (1,'All'),
            (2,'MOBILES'),
            (3,'Laptops'),
            (4,'Gadgets'),
            (5,'New apps/websites'),
            (6,'New Games'),
            (7,'EV Bikes'),
            (8,'EV Cars'),
            (9,'TECHNews'))
    )
    categorys=models.IntegerField(default=0,choices=(
            (1,'MOBILES'),
            (2,'Laptops')      
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    thumbtxt=models.TextField(max_length=None,null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    specifications=models.JSONField(null=True,blank=True)
    highlights=models.JSONField(null=True,blank=True)
    lanuch_date=models.DateField(default=datetime.now,blank=True,null=True)
    Availability=models.JSONField(null=True,blank=True)
    cost=models.CharField(max_length=20,null=True,blank=True)
    expected_cost=models.CharField(max_length=20,null=True,blank=True)
    pros=models.TextField(null=True,blank=True)
    cons=models.TextField(null=True,blank=True)
    usage=models.TextField(null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
    def increment_likes(self,user):
        self.likes +=1
        self.save()
        print(self.likes)
    def decrement_likes(self):
        self.dislikes +=1
class Gadgets(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (3,'Gadgets'),
            (0,"none")
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    tech_specifications=models.JSONField(null=True,blank=True)
    features=models.JSONField(null=True,blank=True)
    price=models.CharField(max_length=20,null=True,blank=True)
    Availability=models.JSONField(null=True,blank=True)
    used_for=models.TextField(null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
   
class Apps_websites(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (4,'New apps/websites'),
            (6,'Games'),
            (0,"none")
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    logoimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    App_info=models.JSONField(null=True,blank=True)
    compatability=models.JSONField(null=True,blank=True)
    Rating=models.JSONField(null=True,blank=True)
    user_benfits=models.TextField(null=True,blank=True)
    pricePlans=models.JSONField(null=True,blank=True)
    about_app=models.TextField(null=True,blank=True)
    Availability=models.JSONField(null=True,blank=True)
    made_in=models.TextField(null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
class Games(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (4,'New apps/websites'),
            (6,'Games'),
            (0,"none")
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    logoimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    game_info=models.JSONField(null=True,blank=True)
    compatability=models.JSONField(null=True,blank=True)
    Rating=models.JSONField(null=True,blank=True)
    pricePlans=models.JSONField(null=True,blank=True)
    about_game=models.TextField(null=True,blank=True)
    Availability=models.JSONField(null=True,blank=True)
    made_in=models.TextField(null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
class EVcars(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (5,'EVcars'),
            (7,'Evbikes')
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    specifications=models.JSONField(null=True,blank=True)
    ride_experience=models.TextField(null=True,blank=True)
    Riding_modes=models.JSONField(null=True,blank=True)
    safety_features=models.JSONField(null=True,blank=True)
    price=models.CharField(max_length=30,null=True,blank=True)
    pros=models.JSONField(max_length=30,null=True,blank=True)
    cons=models.JSONField(max_length=30,null=True,blank=True)
    warranty=models.TextField(null=True,blank=True)
    chargingRange=models.JSONField(null=True,blank=True)
    Rating=models.JSONField(null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)

class EVbikes(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (5,'EVcars'),
            (7,'Evbikes')
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    subimge1=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge2=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge3=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge4=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    subimge5=models.ImageField(upload_to='media/subimg',null=True,blank=True)
    specifications=models.JSONField(null=True,blank=True)
    ride_experience=models.TextField(null=True,blank=True)
    Riding_modes=models.JSONField(null=True,blank=True)
    safety_features=models.JSONField(null=True,blank=True)
    price=models.CharField(max_length=30,null=True,blank=True)
    pros=models.JSONField(max_length=30,null=True,blank=True)
    cons=models.JSONField(max_length=30,null=True,blank=True)
    warranty=models.TextField(null=True,blank=True)
    chargingRange=models.JSONField(null=True,blank=True)
    Rating=models.JSONField(null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
class Technews(models.Model):
    categorys=models.IntegerField(default=0,choices=(
            (8,'Technews'),
            (0,'None')
    ))
    categories_with_time=models.TextField(default='none',null=True)
    title=models.TextField(default='none',null=True)
    brand=models.CharField(default='none',null=True,max_length=20)
    thumbtxt=models.TextField(null=True,blank=True)
    thumbimg=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    video=models.FileField(upload_to='media/videos',blank=True,null=True)
    
    sample_video_txt=models.TextField(null=True,blank=True)
    sample_img=models.ImageField(upload_to='media/thumbimg/',max_length=30,null=True,blank=True)
    sample_img_txt=models.TextField(null=True,blank=True)
    about_news=models.TextField(null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    likes=models.IntegerField(default=0,null=True,blank=True)
    dislikes=models.IntegerField(default=0,null=True,blank=True)
    main_points=models.JSONField(null=True,blank=True)

class whislist(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE,related_name='User',null=True,blank=True)
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE,related_name='products',null=True,blank=True)
    object_id=models.PositiveIntegerField()
    product=GenericForeignKey('content_type','object_id')
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    added_whishlist=models.BooleanField(default=False)

class user_likes(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE,related_name='likedUser',null=True,blank=True)
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE,related_name='content_type')
    object_id=models.PositiveIntegerField()
    product=GenericForeignKey("content_type","object_id")
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
    is_like=models.BooleanField(default=True)
    class Meta:
        unique_together=["User","content_type","object_id","is_like"]
        
class comments(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE,related_name='usersc',null=True,blank=True)    
    user_img=models.ImageField(upload_to='media/user_imgs',null=True,blank=True)
    content_type_c=models.ForeignKey(ContentType,on_delete=models.CASCADE,null=True,blank=True)
    object_id_c=models.PositiveIntegerField(blank=True,null=True)
    product_C=GenericForeignKey('content_type_c','object_id_c')
    comment=models.TextField(null=True,blank=True)
    upload_date=models.DateField(auto_now=True,null=True,blank=True)
class Search(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='user',null=True,blank=True)    
    searched_data=models.TextField()
    date=models.DateTimeField(auto_now_add=True)
    sort_data=models.IntegerField(null=True)

    