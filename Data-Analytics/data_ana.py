import csv
from datetime import datetime

def date_average():
    arr = []
    arr_date = []
    dep_date = []
    wagon =[]
    avg = []

    fi = open('info.csv', 'r')
    f = csv.reader(fi)

    file = open('info.csv','r')
    r = csv.reader(file) 

    for i in r:
        arr.append(i[10])
        arr_date.append(i[11])
        dep_date.append(i[8])
        wagon.append(i[4])

    arrDiff = [1]
    arrDiff[0] = arr[0]
    count = False

    for i in range(len(arr)) :  #finds for the name of different ports
        ele = arr[i]
        count = False
        for j in arrDiff :
            if j == ele :
                count=True
        if count==False :
            arrDiff.append(ele)
    print(arrDiff)

    for i in range(len(arrDiff)):  #loop 
        arr_datep = []
        dep_datep = []
        wagonp =[]
        diff = []
        total_hours = []
        ele = arrDiff[i]
        for j in range(len(arr)):
            ele1 = arr[j]
            if ele1 == ele :
                arr_datep.append(arr_date[j])
                dep_datep.append(dep_date[j])
                wagonp.append(int(wagon[j]))

        for m in range(len(dep_datep)):
            date1 = datetime.strptime(arr_datep[m], '%m/%d/%Y %H:%M')
            date2 = datetime.strptime(dep_datep[m], '%m/%d/%Y %H:%M')
            diff = date1 - date2
            # print(diff)
            days = diff.days
            days_to_hours = days* 24
            # print(diff.seconds)
            total_hours[m] = float(days_to_hours) + float(diff.seconds/3600)
        avg_time = sum(total_hours)/len(total_hours)
        avg_wagon = sum(wagonp)/len(wagonp)
        avg = (["JNPT" , arrDiff[i] , avg_time , avg_wagon])
        print(avg)

    # myFile = open('date_details.csv', 'w')
    # with myFile:
    #     writer = csv.writer(myFile)
    #     writer.writerows(avg)
    # csvFile.close()

date_average()













































