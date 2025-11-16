from .models import feedback,userdata,postdata,whislist,Gadgets,user_likes,Apps_websites,EVbikes,EVcars,comments,Games,Technews,Search
from django.db.models import Q
from spellchecker import SpellChecker
import os
from django.contrib.contenttypes.models import ContentType
def postdata_fun(query):
    checker=SpellChecker()
    file_path = os.path.join(os.path.dirname(os.path.abspath('C:/Users/User/webenv/dtechproject/dtechapp/spellings.txt')), 'spellings.txt')
    checker.word_frequency.load_text_file(file_path)
    
    corrected_word=checker.correction(query)
    
   

    q_obj=Q()
    for i in query.split():
        q_obj |= Q(thumbtxt__icontains=i) | Q(categorys__icontains=i)
        
    postdata_data=postdata.objects.filter(q_obj).values('id','thumbtxt','thumbimg','upload_date')
    Apps_websites_data=Apps_websites.objects.filter(q_obj).values('id','thumbtxt','thumbimg','upload_date')
    data=[postdata_data,Apps_websites_data]
    dict=[]
    for z in data:
        for i in z:
            dict.append(
            {
                "id":i['id'],
                "thumbimg":i['thumbimg'],
                'thumbtxt':i['thumbtxt'],
                'upload_date':i['upload_date'],
                
            }
            )
    return dict
def Search_keywords(search,user):
    q_obj=Q()
    for i in search.split():
        q_obj |= Q(searched_data__icontains=i) 
    if user.is_anonymous:
        data=Search.objects.filter(q_obj)
    else:
        data=Search.objects.filter(q_obj,user=user).values('searched_data')
    return data
