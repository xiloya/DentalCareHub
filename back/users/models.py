from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField(null=True, blank=True)
    role = models.CharField(max_length=10, choices=[('dentist', 'Dentist'), ('patient', 'Patient')])

class Dentist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='dentist_profile')
    specialization = models.CharField(max_length=100)
    available = models.BooleanField(default=True)

    def delete(self, *args, **kwargs):
        self.user.delete()
        super().delete(*args, **kwargs)

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    medical_history = models.TextField()
    dentist = models.ForeignKey(Dentist, on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')

    def delete(self, *args, **kwargs):
        self.user.delete()
        super().delete(*args, **kwargs)

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField()
    reason = models.TextField()

class Notes(models.Model):
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE, related_name='notes')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='notes')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Invoice(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='invoices')
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE, related_name='invoices')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
