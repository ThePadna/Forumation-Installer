# Forumation-Installer
Script for easy installation of [Forumation](https://github.com/ThePadna/Forumation) and surrounding software.

## Prerequisites

#### Step 1

Firstly, make sure [NodeJS](https://nodejs.org/en/download/), [Composer](https://getcomposer.org/download/) and [PHP](https://www.php.net/downloads.php) are installed on your system.
#### Step 2

Secondly, clone or download this script. Clone or download [Forumation](https://github.com/ThePadna/Forumation) and place it in the script's folder under the name 'Forumation-master'.

#### Step 3

Thirdly, run the installation files in order:
1. Run `install-dependencies.bat`
2. Run `run-installer.bat`
3. Run `finish-setup.bat` (located in `/forumation-server`)
4. Run `start-server.bat` or have your MySQL server listening. (located in `/forumation-server`)
5. Run `migrate.bat` (located in `/forumation-server/forumation`)

### How do I run the server?
There are 2 batch files located in `/forumation-server`, `start-server.bat` and `stop-server.bat`. php-cgi daemon must be running on port 9000.

### How do I run php-cgi daemon?
Head to the directory where you installed php, execute `php-cgi.exe -b 127.0.0.1:9000`. Feel free to use a different port, but you must modify `Nginx.conf`.

