# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import os
import sys
import csv
import pymysql
import mysqlDbQuery

def mysqlDBConnecntion(u, pw, h, p, d):
    try:
        conn = pymysql.connect(user = u, password = pw, host =h, port=p, database=d)
        print("DB connection success: {0}".format(h))
    except pymysql.Error as e:
        print("Error connecting to mysql platform : {}".format(e))
        sys.exit(1)
    return conn

def mysqlDbclose(_dbConn):
    try:
        _dbConn.close()
        print("DB Close Sucess")
    except pymysql.Error as e:
        print("Error closing from mysql platform")
        sys.exit(1)
        
    
dbConn = mysqlDbQuery.mysqlDBConnecntion('root','8540','127.0.0.1',3306,'mydb')
cursor = dbConn.cursor()

file = open('./서울특별시 용산구_흡연구역_10_22_2021.csv','r',encoding='UTF8')
fReader = csv.reader(file)

for line in fReader:
    query = "insert into facility(facility_id, title, img, location, type, installAgency, la, lo, rating, createdAt, updatedAt, status) 
                values ('{0}','{1}','{2}','{3}')".format(rand()*1000000,line[0],line[1],line[2],line[3])
    cursor.execute(query)
    
file.close()

dbConn.commit()
cursor.close()
mysqlDbQuery.mysqlDbclose(dbConn)
