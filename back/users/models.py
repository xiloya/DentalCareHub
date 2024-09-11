from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    dob = models.DateField(null=True, blank=True) 
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

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
