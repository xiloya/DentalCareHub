from rest_framework import serializers
from .models import User, Patient, Dentist, Appointment, Notes, Invoice

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'dob', 'phone_number', 'address']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            dob=validated_data.get('dob', None),
            phone_number=validated_data.get('phone_number', ''),
            address=validated_data.get('address', '')
        )
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(partial=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'dentist', 'medical_history']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
      
        user = User.objects.create_user(**user_data)
        patient = Patient.objects.create(user=user, **validated_data)
        return patient

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        instance.dentist = validated_data.get('dentist', instance.dentist)
        instance.medical_history = validated_data.get('medical_history', instance.medical_history)
        instance.save()

        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()

        return instance

class DentistSerializer(serializers.ModelSerializer):
    user = UserSerializer(partial=True)
    patients = PatientSerializer(many=True, read_only=True)

    class Meta:
        model = Dentist
        fields = ['id', 'user', 'specialization', 'available', 'patients']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
       
        user = User.objects.create_user(**user_data)
        dentist = Dentist.objects.create(user=user, **validated_data)
        return dentist

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        instance.specialization = validated_data.get('specialization', instance.specialization)
        instance.available = validated_data.get('available', instance.available)
        instance.save()

        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()

        return instance

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'dentist', 'date', 'reason']

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'dentist', 'patient', 'content', 'created_at']

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['id', 'patient', 'dentist', 'amount', 'description', 'created_at']
