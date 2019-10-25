#include<iostream>
#include<cstring>
using namespace std;
int main() {
	string s;
	cin>>s;
	for(int i=0; i<s.length(); i++)
	{
		if(s[i] == s[i+1])
		{
			s.erase(i+1);
		}
	}
	cout<<s<<endl;
	return 0;
}
