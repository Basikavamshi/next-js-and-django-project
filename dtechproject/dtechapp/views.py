from collections import UserList
from multiprocessing import AuthenticationError
from django.shortcuts import render
from .models import feedback,userdata,postdata,whislist,Gadgets,user_likes,Apps_websites,EVbikes,EVcars,comments,Games,Technews,Search
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from .serializers import feedbacks,myserializer,userserilizer,myserializerd,loginuser,getSerialaizer,whislistserializer,singserializer
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from django.core.signing import TimestampSigner,Signer
import random
import smtplib
from django.core.mail import send_mail,EmailMessage
from django.contrib.contenttypes.models import ContentType
from rest_framework.mixins import ListModelMixin,CreateModelMixin,UpdateModelMixin,RetrieveModelMixin
from rest_framework.generics import GenericAPIView,ListCreateAPIView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from dtechapp.permissions import Naa_permissions
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login
from rest_framework_simplejwt.authentication import JWTStatelessUserAuthentication,JWTAuthentication
from rest_framework_simplejwt.models import TokenUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.core import serializers
from django.contrib.sessions.models import Session
from rest_framework.exceptions import APIException
from .search_functions import postdata_fun,Search_keywords
from .serializers import UserCommentsSerializer
# Create your views here..
class UserCommentsViewSet(viewsets.ModelViewSet):
    queryset = Gadgets.objects.all()
    serializer_class = UserCommentsSerializer
@api_view(['POST','GET'])
@authentication_classes([JWTStatelessUserAuthentication])
@permission_classes([permissions.AllowAny])
def home(request):
    if request.method=='GET':
        auth=JWTStatelessUserAuthentication()
        print(request.session.get('user'))
        return Response({'user':'vamshi'})
    if request.method=="POST":
        user=request.data
        username=request.user.User
        print(request)
        print(username)
        return Response({'user':username})
    return Response({'status':200})
class apiview(APIView):
    def get (self,request):
        return Response({'user':'vamshi'})
    def post(self,reqeust):
        serializer=myserializer(data=reqeust.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@authentication_classes([TokenAuthentication])
class genup(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=userserilizer
    
    def perform_create(self, serializer):
        serializer.save(highlited=self.request.user)
    
class myclass(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=myserializerd

class tokenclass(ObtainAuthToken):
    def get(self,request):
        return Response({'user':'vamshi'})
    def post(self,request,*args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
class Loginuser(ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=loginuser
    authentication_classes=[JWTAuthentication]
    permission_classes=[permissions.AllowAny]
    def post(self,request):
        username=request.data['username']
        password=request.data['password']
        usr=JWTAuthentication()
        author=usr.authenticate(request=request)
        user=authenticate(user=request.user)
        if user:
            
            return Response({'user':'sucess'})
        else:
           
           return Response({'user':'vamshi'})

class Tokens(ListCreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[permissions.AllowAny]
    serializer_class=myserializer
    queryset=User.objects.all()
    def post(self,request):
        serializer=self.serializer_class(data=request.data)
        author=JWTAuthentication()
        
        if serializer.is_valid():
            user=serializer.validated_data
            token=RefreshToken.for_user(user)
            access=token.access_token
            refresh=token
            usr=author.get_user(validated_token=access)
            
            email_id=User.objects.filter(username=usr).values('email')
            for i in email_id:
                pass
            self.request.session['token']=str(access)
            self.request.session['user']=str(user)
            self.request.session['refresh']=str(refresh)
            self.request.session['email']=str(i['email'])
            self.request.session.modified = True 
            self.request.session.save()

            print(access)
            return Response({'access':str(access),'refresh':str(refresh),'user':str(usr),'email':i['email'],'auth':True})
        else:
            for j in serializer.errors.values():
                for z in j:
                    pass
            raise APIException(z)
class Logout(APIView):
    def get(self,request):
        
        request.session.flush()
     
        return Response({'access':str('login'),'refresh':str('login'),'user':str('unknown'),'email':'','auth':False})
class Whishlist(generics.CreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[permissions.AllowAny]
    serializer_class=whislistserializer
    queryset=whislist.objects.all().values()
   
    def get(self,request):
        data=whislist.objects.filter(User=request.user).values()
        content_type_id=[]
        object_id=[]
        for id in data:
            content_type_id.append(id['content_type_id'])
            object_id.append(id['object_id'])
        objects=ContentType.objects.filter(id__in=content_type_id)
        products=[]
        
        for i in objects:
            fields=i.get_all_objects_for_this_type(id__in=object_id).values('thumbimg','upload_date','thumbtxt','id')
            for j in fields:
                print(j)
                products.append({
                    'id':j['id'],
                    'thumbimg':j['thumbimg'],
                    'thumbtxt':j['thumbtxt'],
                    'upload_date':j['upload_date']
                })
        
        print(products)
        if products==[]:
            return Response([False])
        else:
            return Response(products)
    
    def post(self,request):
        user=request.user
        product_id=request.data['product']
        categ=request.data['categorys']
        print(type(categ))
        if categ==1 or categ==2:
            product=ContentType.objects.get_for_model(postdata)
            whislist_product=product.get_object_for_this_type(id=product_id)
        elif categ==3:
            product=ContentType.objects.get_for_model(Gadgets)
            whislist_product=product.get_object_for_this_type(id=product_id)
        elif categ==4:
            product=ContentType.objects.get_for_model(Apps_websites)
            whislist_product=product.get_object_for_this_type(id=product_id)
        elif categ==5:
            product=ContentType.objects.get_for_model(EVcars)
            whislist_product=product.get_object_for_this_type(id=product_id)
        elif categ==6:
            product=ContentType.objects.get_for_model(Games)
            whislist_product=product.get_object_for_this_type(id=product_id)
        elif categ==7:
            product=ContentType.objects.get_for_model(EVbikes)
            whislist_product=product.get_object_for_this_type(id=product_id)
        
        else:
            pass
        productw=whislist.objects.filter(content_type=product,object_id=product_id,User=user)
        if productw:
            productw.delete()
            print('removed')
            return Response({'data':
                            'successfull removed'})
        else:
            whislist.objects.create(product=whislist_product,User=user,added_whishlist=True)
            print('added')
            return Response({'data':'successfully added '})
class Getview(ListCreateAPIView):
    permission_classes=[permissions.AllowAny]
    serializer_class=getSerialaizer
    queryset=postdata.objects.all().values()
    def get(self,request,id): 
        user=self.request.session.items()
        product=whislist.objects.filter(object_id=17).values()
        print(id)
        match id:
            case 'all':
                objects=ContentType.objects.filter(id__in=[12,15,16,25,26,27])
        
        
        
                dict=[]
                for j in objects:
    
                    products=j.get_all_objects_for_this_type().values('id','thumbimg','thumbtxt','upload_date',"categorys")
                    for z in products:
                        dict.append(
                        {
                            "id":z['id'],
                            "thumbimg":z['thumbimg'],
                            'thumbtxt':z['thumbtxt'],
                            'upload_date':z['upload_date'],
                            'categorys':z['categorys'],
                        }
                    )
        
                return Response({'data':dict})
            case '1':
                data=postdata.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                print("1 0r 2 =",id)
                return Response({'data':data})
            case '2':
                data=postdata.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                print("1 0r 2 =",id)
                return Response({'data':data})
            case '3':
                print('3')
                data=Gadgets.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                return Response({'data':data})
            case '4':
                print('4')
                data=Apps_websites.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                return Response({'data':data})
            case '5':
                print('5')
                data=EVcars.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                print(data)
                return Response({'data':data})
            case '6':
                print("6")
                data=Games.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                return Response({'data':data})
            case '7':
                data=EVbikes.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys')
                return Response({'data':data})
            case '8':
                data=Technews.objects.filter(categorys=int(id)).values('id','thumbimg','thumbtxt','upload_date','categorys') 
                return Response({'data':data})   
            case _:
                print("default")
                return Response({'data':[]})   



       
       

class Likes(APIView):
    def get(self,request,categ,id):
        p=ContentType.objects.get_for_model(postdata)
        l=user_likes.objects.filter(User=request.user).values('object_id')
        return Response('ok')
    def post(self,request,categ,id,str):
        if categ=='1' or categ=='2':
            product=ContentType.objects.get_for_model(postdata)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='3':
            product=ContentType.objects.get_for_model(Gadgets)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='4':
            product=ContentType.objects.get_for_model(Apps_websites)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='5':
            product=ContentType.objects.get_for_model(EVcars)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='6':
            product=ContentType.objects.get_for_model(Games)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='7':
            product=ContentType.objects.get_for_model(EVbikes)
            liked_product=product.get_object_for_this_type(id=id)
        elif categ=='8':
            product=ContentType.objects.get_for_model(Technews)
            liked_product=product.get_object_for_this_type(id=id)
            
        else:
            pass
        existed_product=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).first()
        if str=="L":#if user liked the product
            if existed_product:
                if existed_product.is_like==False:
                    existed_product.delete()
                    user_likes.objects.create(User=request.user,product=liked_product,is_like=True)
                else:
                    existed_product.delete()
                
            else:
                user_likes.objects.create(User=request.user,product=liked_product,is_like=True)
                print('liked')
        elif str=="D":#if user disliked the product
            if existed_product:
                print('undhi')
                if existed_product.is_like==True:
                    print('true')
                    existed_product.delete()
                    user_likes.objects.create(User=request.user,product=liked_product,is_like=False)
                else:
                    existed_product.delete()


            else:
             user_likes.objects.create(User=request.user,product=liked_product,is_like=False)
             print('liked')
        
            
        like_counts=user_likes.objects.filter(content_type=product,is_like=True,object_id=id).count() 
        dis_counts=user_likes.objects.filter(content_type=product,is_like=False,object_id=id).count()
        return Response({'likes':like_counts,'dislikes':dis_counts})
    

class getcontent(APIView):
    permission_classes=[permissions.AllowAny]
    def get(self,request,categ,id):
        if categ=='1' or categ=='2':
            data=postdata.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(postdata)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True,object_id=id).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False,object_id=id).count()
            
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]
            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id).values('added_whishlist')
            except:
                wishlist=[]

            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')
            
        
        elif categ=='3':
            data=Gadgets.objects.get(id=id).values()
            product=ContentType.objects.get_for_model(Gadgets)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]
            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id)
            except:
                wishlist=[]
        elif categ=='4':
            data=Apps_websites.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(Apps_websites)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]
            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id).values('added_whishlist')
            except:
                wishlist=[]
            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')
        elif categ=='6':
            data=Games.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(Games)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True,object_id=id).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False,object_id=id).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]
            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id).values('added_whishlist')
            except:
                wishlist=[]
            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')    
        elif categ=='5':
            data=EVcars.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(EVcars)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]

            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id)
            except:
                wishlist=[]
            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')
        elif categ=='7':
            data=EVbikes.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(EVbikes)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]

            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id)
            except:
                wishlist=[]
            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')     
        elif categ=='8':
            data=Technews.objects.filter(id=id).values()
            product=ContentType.objects.get_for_model(Technews)
            like_counts=user_likes.objects.filter(content_type=product,is_like=True).count() 
            dis_counts=user_likes.objects.filter(content_type=product,is_like=False).count()
            try:
                is_like=user_likes.objects.filter(User=request.user,content_type=product,object_id=id).values('is_like')
            except:
                is_like=[]

            try:
                wishlist=whislist.objects.filter(User=request.user,content_type=product,object_id=id)
            except:
                wishlist=[]
            product_comments=comments.objects.filter(content_type_c=product,object_id_c=id).values('comment','User')
            user_ids=[]
            dict_com=[]
            for i in product_comments:
                user_ids.append(i['User'])
            user=User.objects.filter(id__in=user_ids).values('username')     
        else:
            pass
    
        dict={}
        checklike={}
        checkwish={}
        for j in product_comments:
                for z in user:
                    dict_com.append({
                        'username':z['username'],
                        'comments':j['comment']
                    })
        for dict in data:
            pass
        for checklike in is_like:
            pass
        for checkwish in wishlist:
            pass
        print(dict)
        if checklike=={}:
            return Response({'data':dict,'likes':like_counts,'dislikes':dis_counts,'is_like':None,'product_comments':dict_com,'checkwish':checkwish})
        
        
        return Response({'data':dict,'likes':like_counts,'dislikes':dis_counts,'is_like':checklike['is_like'],'product_comments':dict_com,'checkwish':checkwish})
        
class All_view(APIView):
    def get(self,request):
        
        objects=ContentType.objects.filter(id__in=[12,15,16,25,26,27])
        
        
        
        dict=[]
        for j in objects:
    
            products=j.get_all_objects_for_this_type().values('id','thumbimg','thumbtxt','upload_date',"categorys")
            for z in products:
                dict.append(
                {
                    "id":z['id'],
                    "thumbimg":z['thumbimg'],
                    'thumbtxt':z['thumbtxt'],
                    'upload_date':z['upload_date'],
                    'categorys':z['categorys'],
                }
            )
        
        return Response({'data':dict})
class User_comments(APIView):
    def post(self,request,categ,id):
        user=request.user
        text=request.data['text']
        print(id)
        print(categ)
        if categ=='1' or categ=='2':
           content_type=ContentType.objects.get_for_model(postdata)
           product=content_type.get_object_for_this_type(id=id)

        if categ=='3':
           content_type=ContentType.objects.get_for_model(Gadgets)
           product=content_type.get_object_for_this_type(id=id)
        
        if categ=='4':
            content_type=ContentType.objects.get_for_model(Apps_websites)
            product=content_type.get_object_for_this_type(id=id)
        if categ=='6':
            content_type=ContentType.objects.get_for_model(Apps_websites)
            product=content_type.get_object_for_this_type(id=id)
        if categ=='5':
            content_type=ContentType.objects.get_for_model(EVcars)
            product=content_type.get_object_for_this_type(id=id)
        if categ=='7':
            content_type=ContentType.objects.get_for_model(EVbikes)
            product=content_type.get_object_for_this_type(id=id)
        if categ=='8':
            content_type=ContentType.objects.get_for_model(Technews)
            product=content_type.get_object_for_this_type(id=id)
       
        comments.objects.create(User=user,comment=text,product_C=product)    
        return Response('hey')
class Sing_Up(ListCreateAPIView):
    permission_classes=[permissions.AllowAny]
    authentication_classes=[JWTAuthentication]
    serializer_class=singserializer
    queryset=User.objects.all().values()
    def post(self,request):
        serialzer=self.serializer_class(data=request.data)
        author=JWTAuthentication()
        if serialzer.is_valid():
            user=serialzer.validated_data
            login(request,user=user)
            token=RefreshToken.for_user(user)

            access=token.access_token
            refresh=token
            usr=author.get_user(validated_token=access)
            email_id=User.objects.filter(username=usr).values('email')
            for i in email_id:
                pass
            request.session['token']=str(access)
            request.session['user']=str(user)
            request.session['refresh']=str(refresh)
            request.session['email']=str(i['email'])
            return Response({'access':str(access),'refresh':str(refresh),'user':str(usr),'email':i['email'],'auth':True})
        else:
            for j in serialzer.errors.values():
                for z in j:
                    print(z)
            raise APIException(z)
class Send_feedback(APIView):
    def post(self,request):
        text=request.data['feedback']
        email=request.data['email']
        feedback=f'User_Email:{email}\nFeedback from user:{text}'
        print(feedback)
        mail=EmailMessage(
           'test',
            feedback,
           '',
           ['basikavamshi@gmail.com']
         )
        mail.from_email='badboy@gmail.com'
        mail.send()
        return Response('success')
class Reset_password(APIView):
    def post(self,request):
        email=request.data['email']
        user=User.objects.filter(email=email)
        link=Signer()
        log=TimestampSigner()
        token=link.sign(email)
        print(user)
        verification_link=f'http://localhost:3000/password_rest?token={token}'
        body=f'Dear User,\nwe received a request to rest your password on techX\nplease click the following link to rest your password\n\n{verification_link}\n\nif you did not request this password reset,please ignore this mail\n\nThank you,\ntechX team'
        
        if user:
            mail=EmailMessage(
                'techX Password Reset Request',
                 body,
                'baikavamshi@gmail.com',
                [email]
            )
            
            mail.send(fail_silently=False)
            return Response({'data':True})
        else:
            raise APIException('The email provided is not associated with any existing account. ')
class Verify_link(APIView):

    def post(self,request):
        author=JWTAuthentication()
        link=request.data['token']
        sign=Signer()
        email=sign.unsign(link)
        user=User.objects.get(email=email)
        token=RefreshToken.for_user(user)
        access=token.access_token
        
        refresh=token  
        user=author.get_user(access)
        request.session['token']=str(access)
        request.session['user']=str(user)
        request.session['refresh']=str(refresh)
        request.session['email']=str(email)
        return Response({'access':str(access),'refresh':str(refresh),'user':str(user),'email':email,'auth':True})
class Password_chnage(APIView):
    def post(self,request,str):
        user=User.objects.get(email=str)
        password=request.data['password']
        conform_password=request.data['conform_password']
        if password==conform_password:
            user.set_password('1234567')
            user.save()
            return Response({'login':True})
        else:
            raise APIException('password and conform password should match')
class Share_product(APIView):
    def post(self,request):
        return Response('success')
class Search_view(APIView):
    def post(self,request):
        search=request.data['data']
        postdata_data=postdata_fun(search)
        user=request.user
        print(search)
        if user.is_anonymous:
            return Response({'data':postdata_data})
        else:
          instance=Search.objects.filter(searched_data=search)
          if instance:
              return Response({'data':postdata_data})
          model=Search(user=user,searched_data=search)
          model.save()
          return Response({'data':postdata_data})
    def get(self,request):
        user=request.user
        search=request.query_params.get('search')
        if search:
            data=Search_keywords(search,user)
            return Response({'data':data})
        data=Search.objects.filter(user=user).order_by('-date').values('searched_data')[:10]
        return Response({'data':data})
        