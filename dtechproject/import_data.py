from elasticsearch import Elasticsearch
from dtechapp.models import postdata
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dtechproject.dtechapp.settings")
django.setup()
es=Elasticsearch([{'host':'localhost','port':8000}])

def index_data():
    for item in postdata.objects.all():
        es.index(index='index1', doc_type='_doc', id=item.id, body={
            'id': item.id,
            'thumbtxt': item.thumbtxt,
            # Add other fields as needed
        })

if __name__ == '__main__':
    index_data()