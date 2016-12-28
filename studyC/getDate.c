
#include <stdio.h>
int isLeap(int someYear){
        // 闰年返回1 反之0
        return (someYear%400==0)||(someYear%4==0&&someYear%100!=0);
}
int getDate(int someYear,int someDay,int sums[],int len){
        int tempSums[12]={31};
        int j=1;
        for(;j<len;j++){
                        tempSums[j]=sums[j];
                         if(isLeap(someYear)){
                        // 闰年的话多一天
                        tempSums[j]=sums[j]+1;
                }

        }
        int day=0;
        int i=0;
        for(;i<len;i++){
                if(someDay<=tempSums[i]){
                        // 一月份的比较特殊 另外计算
                        day=i==0?someDay:(someDay-tempSums[i-1]);
                        return (i+1)*100+day;

        }

}
int main(){
        int months[12]={31,28,31,30,31,30,31,31,30,31,30,31};
        int sums[12]={31};
        int i=1;
        // 计算每个月离上一次大年的天数 leapSums是闰年的情况
        for(;i<12;i++){
                sums[i]=sums[i-1]+months[i];
        }

        // 开始输入年份和哪天
        int someYear=1;
        int someDay=1;
        while(someYear!=0){
                printf("Year\n");
                scanf("%d",&someYear);
                printf("day\n");
                scanf("%d",&someDay);
                printf("%d %d\n",someYear,someDay);
                int result = getDate(someYear,someDay,sums,12);
                printf("%d年的第%d天是%d月%d日\n",someYear,someDay,result/100,result%100);
        }
        return 0;
}
