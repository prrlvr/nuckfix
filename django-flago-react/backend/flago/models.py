from django.db import models
import uuid

# Create your models here.

class Article(models.Model):
    UNIT_ENUM = (
        ('L', 'Litre'),
        ('G', 'Gramme'),
        ('U', 'Unitaire'),
    )

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120)
    expiry_date = models.DateField()
    score = models.IntegerField()
    quantity = models.IntegerField()
    unit = models.CharField(max_length=10, choices=UNIT_ENUM)
    tags = models.TextField()

    def _str_(self):
        return self.title
