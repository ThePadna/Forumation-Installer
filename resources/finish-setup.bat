start mariadb/bin/mysql_install_db.exe & cd forumation & composer install & php artisan key:generate & cd ../mariadb/data/ & mkdir forumation & cd ../../forumation/ & php artisan migrate