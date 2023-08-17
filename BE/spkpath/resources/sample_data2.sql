use spkpath;
show tables;
## show tables;

## select * from user_tb;
select * from consultant_info_tb;

insert into consultant_info_tb
values  (cslt1, ssafy, 1, '엄격한, 친근한', '언어발달장애, 말소리장애'),
		(cslt2, ssafy, 2, '친근한, 친절한', '말소리장애, 신경언어장애'),
        (cslt3, ssafy, 3, '친절한, 정적인', '신경언어장애, 유창성장애'),
        (cslt4, ssafy, 4, '정적인, 발랄한', '유창성장애, 음성장애'),
        (cslt5, ssafy, 5, '발랄한, 활동적인', '언어발달장애, 말소리장애, 유창성장애'),
        (cslt6, ssafy, 6, '친절한, 정적인, 친근한', '말소리장애, 신경언어장애, 유창성장애, 음성장애'),
        (cslt7, ssafy, 7, '정적인, 발랄한, 활동적인', '신경언어장애, 유창성장애, 말소리장애, 언어발달장애'),
        (cslt8, ssafy, 10, '정적인', '말소리장애, 언어발달장애'),
        (cslt9, ssafy, 12, '발랄한, 친근한', '음성장애, 언어발달장애');
        