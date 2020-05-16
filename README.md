# Forumation-Installer
##Script for easy installation of Forumation and surrounding software.

>How do I use this installer?
```
Firstly, make sure NodeJS (https://nodejs.org/en/download/), Composer (https://getcomposer.org/download/) and PHP (https://www.php.net/downloads.php) are installed on your system.

Secondly, clone or download this script. Unzip into any path you like.

Thirdly, run the installation files in order:
1. install-dependencies.bat
2. run-installer.bat
3. finish-setup.bat (located in /forumation-server)
4. migrate.bat (located in /forumation-server/forumation)
```
>How do I run the server?
####There are 2 batch files located in /forumation-server, 'start-server' and 'stop-server'. php-cgi daemon must be running on port 9000.

>How do I run php-cgi daemon?
####Head to the directory where you installed php, execute php-cgi.exe -b 127.0.0.1:9000. Feel free to use a different port, but you must modify Nginx.conf.

