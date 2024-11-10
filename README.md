# crudOperationUseNestjs
هذا المشروع هو تطبيق CRUD لإدارة المنتجات باستخدام إطار العمل NestJS، ويحتوي على مصادقة وترخيص ورفع الصور، ويشمل ثلاث وحدات رئيسية:

وحدة المنتجات (Product Module):

تتضمن عمليات CRUD (إنشاء، تحديث، حذف، واسترجاع) للمنتجات.
فقط المستخدمون ذوو الصلاحيات المناسبة، مثل "Admin"، يمكنهم تنفيذ بعض العمليات الحساسة مثل إضافة المنتجات أو حذفها.
يتم رفع الصور للمنتجات باستخدام خدمة Cloudinary، ما يسهل عملية رفع الصور وحفظها.
يتم التحقق من صحة البيانات من خلال Data Transfer Object (DTO) لضمان مطابقة البيانات لمعايير محددة قبل استخدامها.
وحدة المستخدمين (User Module):

تتيح للمستخدمين رفع صورة لملفهم الشخصي باستخدام FileInterceptor.
التحقق من رفع الصورة وإدارة الأخطاء المحتملة مثل عدم وجود ملف محمل لضمان تجربة مستخدم سلسة.
وحدة المصادقة (Auth Module):

تتضمن عمليات التسجيل وتسجيل الدخول، مع التحقق من صحة البيانات باستخدام ValidationPipe وتكامل مع مكتبة Joi للتحقق من صحة بيانات المستخدم.
توفر الوحدة مصادقة JWT لضمان أمان الوصول إلى الموارد المحمية.


This project is a CRUD application for managing products using the NestJS framework. It features authentication, authorization, and image uploading, structured across three main modules:

Product Module:

Handles CRUD operations (create, update, delete, retrieve) for products.
Sensitive operations, like adding or deleting products, are restricted to users with appropriate roles, such as "Admin".
Product images are uploaded using the Cloudinary service, enabling easy image storage and retrieval.
Data validation is implemented using Data Transfer Objects (DTOs) to ensure that all data meets specific standards before processing.
User Module:

Allows users to upload a profile image via FileInterceptor.
Manages error handling for missing files and ensures a smooth user experience.
Authentication Module:

Includes signup and login operations, with data validation enforced through ValidationPipe integrated with Joi, ensuring user input meets necessary requirements.
Provides JWT-based authentication, securing access to protected resources.
