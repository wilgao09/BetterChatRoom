@ECHO OFF

set myIPv4=10.222.1.105

REM step one: start the mongo server

start cmd.exe /c mongod --config "conf/mongod.conf" --bind_ip %myIPv4%
