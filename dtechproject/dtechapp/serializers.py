from rest_framework import serializers
from .models import feedback,userdata,postdata,whislist,Gadgets
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
from rest_framework.exceptions import ValidationError


import json
from django import forms



class JSONInput(forms.TextInput):
    def format_value(self, value):
        if value is not None:
            return json.dumps(value, indent=2)
        return super().format_value(value)

    def value_from_datadict(self, data, files, name):
        value = data.get(name, None)
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value
class UserCommentsSerializer(serializers.ModelSerializer):
    tech_specifications = forms.JSONField(widget=JSONInput, required=False)
    class Meta:
        model = Gadgets
        fields = '__all__'




class feedbacks(serializers.ModelSerializer):
    class Meta:
        model=feedback
        fields="__all__"
class myserializer(serializers.Serializer):
    username=serializers.CharField(max_length=20)
    password=serializers.CharField(max_length=20)
    class Meta:
        fields="__all__"
    def validate(self, data):
        username=data['username']
        password=data['password']
        user=authenticate(username=username,password=password)
        if user:
            return user
        else:
            raise serializers.ValidationError('enter your valid username and password')

class userserilizer(serializers.ModelSerializer):
    snippets=serializers.PrimaryKeyRelatedField(many=True,queryset=userdata.objects.all())
    class Meta:
        model=User
        fields = ['id','username','snippets']
class myserializerd(serializers.ModelSerializer):
    track=serializers.StringRelatedField(many=True)
    owner=serializers.CharField(default=serializers.CurrentUserDefault(),read_only=True)
    class Meta:
        model=User
        fields=['username','track','owner']
class loginuser(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
class getSerialaizer(serializers.ModelSerializer):
    class Meta:
        model=postdata
        fields='__all__'
class whislistserializer(serializers.ModelSerializer):
    products=serializers.PrimaryKeyRelatedField(many=True,queryset=postdata.objects.all())
    class Meta:
        model=whislist
        fields='__all__'

class singserializer(serializers.Serializer):
    username=serializers.CharField(max_length=15)
    email=serializers.EmailField()
    password=serializers.CharField(max_length=30)
    conform_password=serializers.CharField(max_length=30)
    class Meta:
        fields='__all__'
    def validate(self, data):
        auth=User.objects.filter(username=data['username'],email=data['email'])
        if auth:
            error='already have an account with username and email'
            raise serializers.ValidationError(error)
        else:
            try:
                if data['password']==data['conform_password']:
                    user=User.objects.create_user(username=data['username'],email=data['email'],password=data['password'],is_active=True)
                    user.save()
                    return user
            except Exception as e:
                
                print(print(str(e)))
                raise ValidationError('username should be unique '.format(str(e)))

            else:
                raise serializers.ValidationError('password and conform password should match')
        