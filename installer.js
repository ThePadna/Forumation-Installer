const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const http = require('http');
const request = require('request');
const admzip = require('adm-zip');
const fse = require("fs-extra");

const NGINX_PATH = "./nginx",
 MARIADB_PATH = "./mariadb",
 PHP_PATH = "./php",
 SERVER_PATH = "./forumation-server";
const NGINX_URI = "http://nginx.org/download/nginx-1.18.0.zip",
 MARIADB_URI = "https://mirrors.tuna.tsinghua.edu.cn/mariadb//mariadb-10.5.2/win32-packages/mariadb-10.5.2-win32.zip",
 PHP_URI = "https://windows.php.net/downloads/releases/php-7.4.6-Win32-vc15-x86.zip";

/*
	FORUMATION INSTALLER
	This script is a CLI used for installing Forumation on Windows.
	Once Forumation is installed, you may delete this script and any recourses without problems.
*/

console.log(
  chalk.cyan(
    figlet.textSync('Forumation', { horizontalLayout: 'full' })
  )
);

downloadSoftware();

async function downloadSoftware() {
	/*
		PHP download scripts currently blocked..
	*/
	//await dlPHP();
	if(fse.existsSync(SERVER_PATH)) {
		console.log(chalk.red("Error: You must remove " + SERVER_PATH + " if you wish to run this program again."));
		return;
	}
	await dlNginx();
	await dlMariaDB();
	await unZip([MARIADB_PATH, NGINX_PATH]);
	organizeFiles();
	console.log(chalk.cyan.bold("Installation complete!\n Server files will be located at " + SERVER_PATH + ".\n Please run the batch file 'finish-setup' before running the server.\n After the server is running, execute migrate.bat located in the forumation folder to initialize the database." ));
}

/*
	Download Nginx.
*/

function dlNginx() {
	return new Promise((resolve, reject) => {
	if(fse.existsSync(NGINX_PATH) || fse.existsSync(NGINX_PATH + ".zip")) {
		console.log(chalk.cyan("Nginx already exists in current dir, skipping download."));
		return resolve();
	}
	console.log(chalk.cyan("Downloading Nginx.. please wait"));
		request({url: NGINX_URI, encoding: null}, (err, resp, body) => {
			if(err) reject(err);
			fse.writeFile(NGINX_PATH + ".zip", body, (err) => {
			console.log(chalk.gray.bold("Done!"));
			resolve();
			});
		});
	});
}

/*
	Download MariaDB.
*/

function dlMariaDB() {
	return new Promise((resolve, reject) => {
		if(fse.existsSync(MARIADB_PATH) || fse.existsSync(MARIADB_PATH + ".zip")) {
			console.log(chalk.cyan("MariaDB already exists in current dir, skipping download."));
			return resolve();
		}
		console.log(chalk.cyan("Downloading MariaDB.. please wait"));
		request({url: MARIADB_URI, encoding: null}, (err, resp, body) => {
			if(err) reject(err);
			fse.writeFile(MARIADB_PATH + ".zip", body, (err) => {
			console.log(chalk.gray.bold("Done!"));
			resolve();
			});
		});
	});
}

/*
	Download PHP
*/

function dlPHP() {
	return new Promise((resolve, reject) => {
	console.log(chalk.cyan("Downloading PHP.. please wait"));
		request({url: PHP_URI, encoding: null}, (err, resp, body) => {
			if(err) reject(err);
			fse.writeFile(PHP_PATH + ".zip", body, (err) => {
			console.log(chalk.gray.bold("Done!"));
			resolve();
			});
		});
	});
}

/*
	UnZip downloaded software.
*/
function unZip(uriArr) {
	return new Promise((resolve, reject) => {
	console.log(chalk.cyan("Extracting..."));
	uriArr.forEach(e => {
		if(!fse.existsSync(e)) {
			let zip = new admzip(e + ".zip");
			zip.extractAllTo(e, false)
		}
	});
	resolve();
	});
}

/*
	Organize Files inside SERVER_PATH.
*/
function organizeFiles() {
	console.log(chalk.cyan("Constructing server path " + SERVER_PATH));
	fse.mkdir(SERVER_PATH, (err) => {
		if(err) throw err;
		fse.readdir(NGINX_PATH, (err, list) => {
			list.forEach(e => {
				fse.copy(NGINX_PATH + "/" + e, SERVER_PATH)
				.then(() => {
					fse.copy("./resources/nginx.conf", SERVER_PATH + "/conf/nginx.conf", (err) => {if(err) throw err;});
				});
				/*
				We only want the first result of the unzipped download
				*/
				return;
			});
		});
		fse.readdir(MARIADB_PATH, (err, list) => {
			list.forEach(e => {
				fse.copy(MARIADB_PATH + "/" + e, SERVER_PATH + "/mariadb", (err) => {if(err) throw err;});
				/*
				We only want the first result of the unzipped download
				*/
				return;
			});
			});
		fse.copy("./resources/start-server.bat", SERVER_PATH + "/start-server.bat", (err) => {if(err) throw err;});
		fse.copy("./resources/stop-server.bat", SERVER_PATH + "/stop-server.bat", (err) => {if(err) throw err;});
		fse.copy("./resources/finish-setup.bat", SERVER_PATH + "/finish-setup.bat", (err) => {if(err) throw err;});
		fse.copy("./resources/migrate.bat", SERVER_PATH + "/forumation/migrate.bat", (err) => {if(err) throw err;});
		fse.copy("/Forumation-master", SERVER_PATH + "/forumation", (err) => {
			console.log(chalk.red("Error: forumation folder not found in installer directory. Please clone Forumation from github and structure it as /forumation-server/forumation before running.\nAlternatively, download forumation, place it in the installer directory, delete " + SERVER_PATH + ", and re-run this program."));
		});
	})
}