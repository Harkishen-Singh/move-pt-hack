import csv
from datetime import datetime

arr_date = []
dep_date = []

fi = open('info.csv', 'r')
f = csv.reader(fi)


# for i in f:
#     if i[10]=='DD':
#         print(i)

file = open('info.csv', 'r')
r = csv.reader(file)   #reads the file
arr = []
# for i in r:
#     arr_date.append(i[11])

# for i in r:
#     dep_date.append(i[8])

for i in r :
    # print(i[10])
    arr.append(i[10])  #appends the name of different ports
    arr_date.append(i[11]) #appends the arrival time of the port
    dep_date.append(i[8])  #appends the departure time of the port

# print(arr)

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
    count_t = 0
    sum =0
    arr_datep = []
    dep_datep = []
    for j in range(len(arr)):
        if j == i :
            count_t += 1 
            arr_datep.append(arr_date[j])
            dep_datep.append(dep_date[j])

    for d1,d2 in enumerate(arr_datep,dep_datep):
        date1 = datetime.strptime(d1, '%b %d %Y %I:%M%p')
        date2 = datetime.strptime(d2, '%b %d %Y %I:%M%p')
        diff = date1 - date2
        sum = sum + diff
    avg = sum / count_t

    date_avg.append(["JNPT" , arrDiff[i] , avg])


myFile = open('date_details.csv', 'w')
with myFile:
    writer = csv.writer(myFile)
    writer.writerows(data_avg)


        
        # for i in r:
            

        
        # for d in dates:
        # date = datetime.strptime(d, '%b %d %Y %I:%M%p')
        # print type(date)
        # print date




        # now = int(time.time()) # epoch seconds
        # then = now - 90000 # some time in the past

        # d = divmod(now-then,86400)  # days
        # h = divmod(d[1],3600)  # hours
        # m = divmod(h[1],60)  # minutes
        # s = m[1]  # seconds

        # print '%d days, %d hours, %d minutes, %d seconds' % (d[0],h[0],m[0],s)
