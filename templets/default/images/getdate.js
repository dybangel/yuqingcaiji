
todayDate = new Date();
date = todayDate.getDate();
month= todayDate.getMonth() +1;
year= todayDate.getYear();

if(navigator.appName == "Netscape")
{
    document.write(1900+year);
    document.write("��");
    document.write(month);
    document.write("��");
    document.write(date);
    document.write("�� ");

}
if(navigator.appVersion.indexOf("MSIE") != -1)
{
document.write(year);
document.write("��");
document.write(month);
document.write("��");
document.write(date);
document.write("�� ");

}
if (todayDate.getDay() == 5) document.write("������")
if (todayDate.getDay() == 6) document.write("������")
if (todayDate.getDay() == 0) document.write("������")
if (todayDate.getDay() == 1) document.write("����һ")
if (todayDate.getDay() == 2) document.write("���ڶ�")
if (todayDate.getDay() == 3) document.write("������")
if (todayDate.getDay() == 4) document.write("������")
