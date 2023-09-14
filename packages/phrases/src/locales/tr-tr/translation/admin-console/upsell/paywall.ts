const paywall = {
  applications:
    '<planName/> limitine ulaşılan {{count, number}} başvuru. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardım için lütfen <a>bizimle iletişime geçin</a>.',
  applications_other:
    '<planName/> limitine ulaşılan {{count, number}} başvurular. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardım için lütfen <a>bizimle iletişime geçin</a>.',
  machine_to_machine_feature:
    'Makine-makine uygulaması oluşturmak ve tüm premium özelliklere erişim sağlamak için ücretli bir plana yükseltin. Yardım için lütfen <a>bizimle iletişime geçin</a>.',
  machine_to_machine:
    '<planName/> limitine ulaşılan {{count, number}} makine-makine başvurusu. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardım için lütfen <a>bizimle iletişime geçin</a>.',
  machine_to_machine_other:
    '<planName/> limitine ulaşılan {{count, number}} makine-makine başvuruları. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardım için lütfen <a>bizimle iletişime geçin</a>.',
  resources:
    '{{count, number}} <planName/> API kaynağı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  resources_other:
    '{{count, number}} <planName/> API kaynağı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  scopes_per_resource:
    '{{count, number}} <planName/> API kaynağı başına izin sınırına ulaşıldı. Genişletmek için şimdi yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  scopes_per_resource_other:
    '{{count, number}} <planName/> API kaynağı başına izin sınırına ulaşıldı. Genişletmek için şimdi yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  custom_domain:
    'Özel etki alanı işlevselliğini açığa çıkarın ve ücretli bir plana geçerek bir dizi premium avantajdan yararlanın. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  social_connectors:
    '{{count, number}} <planName/> sosyal bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  social_connectors_other:
    '{{count, number}} <planName/> sosyal bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  standard_connectors_feature:
    'OIDC, OAuth 2.0 ve SAML protokollerini kullanarak kendi bağlayıcılarınızı oluşturmak, sınırsız sosyal bağlayıcılar ve tüm premium özelliklere erişim sağlamak için ücretli bir plana geçin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  standard_connectors:
    '{{count, number}} <planName/> sosyal bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  standard_connectors_other:
    '{{count, number}} <planName/> sosyal bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için planı yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  standard_connectors_pro:
    '{{count, number}} <planName/> standart bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için Kurumsal plana yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  standard_connectors_pro_other:
    '{{count, number}} <planName/> standart bağlayıcı sınırına ulaşıldı. Ekibinizin ihtiyaçlarını karşılamak için Kurumsal plana yükseltin ve OIDC, OAuth 2.0 ve SAML protokolleri kullanarak kendi bağlayıcılarınızı oluşturma yeteneğine sahip olun. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  roles:
    '{{count, number}} <planName/> rol sınırına ulaşıldı. İlave roller ve izinler eklemek için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  roles_other:
    '{{count, number}} <planName/> rol sınırına ulaşıldı. İlave roller ve izinler eklemek için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  scopes_per_role:
    '{{count, number}} <planName/> rol başına izin sınırına ulaşıldı. İlave roller ve izinler eklemek için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  scopes_per_role_other:
    '{{count, number}} <planName/> rol başına izin sınırına ulaşıldı. İlave roller ve izinler eklemek için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  hooks:
    '{{count, number}} <planName/> webhook sınırına ulaşıldı. Daha fazla webhook oluşturmak için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
  hooks_other:
    '{{count, number}} <planName/> webhook sınırına ulaşıldı. Daha fazla webhook oluşturmak için planı yükseltin. Yardıma ihtiyacınız olursa, <a>iletişime geçin</a>.',
};

export default Object.freeze(paywall);