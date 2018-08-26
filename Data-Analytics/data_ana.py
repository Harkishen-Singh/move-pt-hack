import csv
from datetime import datetime

src = input("Enter the source station: ")
dept = input("Enter the destination station: ")
src.upper()
dept.upper()
print()
def date_average(src,dept):
    arr = []
    arr_date = []
    dep_date = []
    wagon =[]
    avg = []

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
    # print(arrDiff)

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

        for k in range(len(arr_datep)):
            try:
                date1 = datetime.strptime(arr_datep[k], '%m/%d/%Y %H:%M')
                date2 = datetime.strptime(dep_datep[k], '%m/%d/%Y %H:%M')
                diff = date1 - date2
                # print(diff)
                days = diff.days
                days_to_hours = days* 24
                # print(diff.seconds)
                total_hours.append(float(days_to_hours) + float(diff.seconds/3600))
                # print(total_hours)
                # total_hours[k] = float(days_to_hours) + float(diff.seconds/3600)
            except:
                total_hours.append(0)
        avg_time = round(sum(total_hours)/len(total_hours),2)
        avg_wagon = round(sum(wagonp)/len(wagonp),2)
        avg.append(["JNPT", arrDiff[i] , str(avg_time), str(avg_wagon)])

    with open('date_details.csv', 'w') as csvFile:
        writer = csv.writer(csvFile)
        writer.writerows(avg)

    fi = open('date_details.csv', 'r')
    f = csv.reader(fi)
    for i in f:
        if(i[0] == 'JNPT' and i[1] == dept):
            # print("Average Time:%s" %(i[2]))
            # print("Average Wagons:%s" %(i[3]))
            return (i[2],i[3])
















































