#include <stdio.h>
void showArr(int arr[],int len){
        int i=0;
        for(i;i<len;i++){
                printf("%d,",arr[i]);

        }
        printf("\n");
}
void swap(int *a,int * b){
        int c=0;
        c=*a;
        *a=*b;
        *b=c;
}
int main(){
        int a[10]={10,9,8,7,6,5,4,3,2,1};
        showArr(a,10);
        int i=9;
        int j=0;
        for(;i>0;i--){
                for(;j<i;j++){

                        if(a[j]>a[j+1]){
                                swap(&a[j],&a[j+1]);
                                printf("a[%d]=%d\n",j,a[j]);
                        }

                }
                j=0;
        }
        showArr(a,10);





        return 0;

}
