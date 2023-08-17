drop database spkpath;

CREATE DATABASE IF NOT EXISTS `spkpath`;

USE spkpath;

CREATE TABLE `user_tb` (
    `user_id`	char(100)	NOT NULL,
    `user_pwd`	varchar(100)	NOT NULL,
    `user_name`	char(10)	NOT NULL,
    `user_email`	varchar(30)	NOT NULL,
    `user_phone`	varchar(20)	NOT NULL,
    `user_info`	varchar(50)	NULL,
    `user_age`	int	NULL,
    `user_sex`	char(5)	NULL,
    `user_pic`	varchar(120)	NULL,
    `user_grade`	varchar(10)	NOT NULL	DEFAULT 'USER',
    `user_reward`	int	NOT NULL	DEFAULT 0,
    `activated`	boolean	NOT NULL	DEFAULT TRUE
);

CREATE TABLE `reservation_item_tb` (
    `rsv_item_id`	int primary key	NOT NULL auto_increment,
    `user_id`	char(20)	NOT NULL,
    `cslt_id`	char(20)	NOT NULL,
    `rsv_date`	date	NOT NULL,
    `rsv_time`	time	NOT NULL,
    `rsv_status`	varchar(10)	NOT NULL,
    `rsv_info`	varchar(80)	NULL,
    `rsv_code`	char(20)	NOT NULL
);

CREATE TABLE `consultant_info_tb` (
    `user_id`	char(20)	NOT NULL,
    `cslt_team`	varchar(50)	NOT NULL,
    `cslt_exp`	int	NOT NULL
);

CREATE TABLE `board_tb` (
    `board_id`	int	NOT NULL,
    `user_id2`	char(20)	NOT NULL,
    `board_title`	varchar(30)	NOT NULL,
    `board_content`	varchar(200)	NOT NULL,
    `board_hit`	int	NULL	DEFAULT 0,
    `board_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `one_q_tb` (
    `one_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL,
    `one_title`	varchar(100)	NOT NULL,
    `one_content`	varchar(200)	NOT NULL,
    `one_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `one_a_tb` (
    `answer_id`	int	NOT NULL,
    `one_id`	int	NOT NULL,
    `one_answer`	varchar(200)	NOT NULL,
    `one_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `object_tb` (
    `obj_id`	int	NOT NULL auto_increment primary key ,
    `obj_name`	char(10)	NOT NULL,
    `obj_pic`	varchar(100)	NULL
);

CREATE TABLE `syllable_tb` (
    `slb_id`	int	NOT NULL auto_increment primary key ,
    `slb_content`	char(4)	NOT NULL
);

CREATE TABLE `study_syllable_tb` (
    `slb_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `study_object_tb` (
    `obj_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `study_word_tb` (
    `word_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `word_tb` (
    `word_id`	int	NOT NULL auto_increment primary key ,
    `word_content`	varchar(30)	NOT NULL,
    `word_pron` varchar(50) NULL
);

CREATE TABLE `sentence_tb` (
    `stc_id`	int	NOT NULL auto_increment primary key ,
    `stc_content`	varchar(100)	NOT NULL
);

CREATE TABLE `study_sentence_tb` (
    `stc_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `consultant_available_info` (
    `available_date`	date	NOT NULL,
    `available_time`	time	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `tag_tb` (
    `tag_id`	int	NOT NULL,
    `tag_name`	varchar(20)	NOT NULL
);

CREATE TABLE `boundary_tb` (
    `boundary_id`	int	NOT NULL,
    `boundary_name`	varchar(20)	NOT NULL
);

CREATE TABLE `consultant_tag_tb` (
    `id`	int	primary key NOT NULL auto_increment,
    `tag_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `consultant_boundary_tb` (
    `id`	int primary key	NOT NULL auto_increment,
    `boundary_id`	int	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

CREATE TABLE `authority` (
    `authority_name`	char(50)	NOT NULL
);

CREATE TABLE `user_authority` (
    `authority_name`	char(50)	NOT NULL,
    `user_id`	char(20)	NOT NULL
);

ALTER TABLE `user_tb` ADD CONSTRAINT `PK_USER_TB` PRIMARY KEY (
     `user_id`
);

ALTER TABLE `consultant_info_tb` ADD CONSTRAINT `PK_CONSULTANT_INFO_TB` PRIMARY KEY (
    `user_id`
);

ALTER TABLE `one_q_tb` ADD CONSTRAINT `PK_ONE_Q_TB` PRIMARY KEY (
    `one_id`
);

ALTER TABLE `one_a_tb` ADD CONSTRAINT `PK_ONE_A_TB` PRIMARY KEY (
    `answer_id`,
    `one_id`
);

ALTER TABLE `study_syllable_tb` ADD CONSTRAINT `PK_STUDY_SYLLABLE_TB` PRIMARY KEY (
    `slb_id`,
    `user_id`
);

ALTER TABLE `study_object_tb` ADD CONSTRAINT `PK_STUDY_OBJECT_TB` PRIMARY KEY (
    `obj_id`,
    `user_id`
);

ALTER TABLE `study_word_tb` ADD CONSTRAINT `PK_STUDY_WORD_TB` PRIMARY KEY (
    `word_id`,
    `user_id`
);

ALTER TABLE `study_sentence_tb` ADD CONSTRAINT `PK_STUDY_SENTENCE_TB` PRIMARY KEY (
    `stc_id`,
    `user_id`
);

ALTER TABLE `consultant_available_info` ADD CONSTRAINT `PK_CONSULTANT_AVAILABLE_DATE` PRIMARY KEY (
    `user_id`,
    `available_time`,
    `available_date`
);

ALTER TABLE `tag_tb` ADD CONSTRAINT `PK_TAG_TB` PRIMARY KEY (
    `tag_id`
);

ALTER TABLE `boundary_tb` ADD CONSTRAINT `PK_BOUNDARY_TB` PRIMARY KEY (
    `boundary_id`
);

ALTER TABLE `authority` ADD CONSTRAINT `PK_AUTHORITY` PRIMARY KEY (
    `authority_name`
);

ALTER TABLE `user_authority` ADD CONSTRAINT `PK_USER_AUTHORITY` PRIMARY KEY (
    `authority_name`,
    `user_id`
);

ALTER TABLE `consultant_info_tb` ADD CONSTRAINT `FK_user_tb_TO_consultant_info_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);


ALTER TABLE `one_a_tb` ADD CONSTRAINT `FK_one_q_tb_TO_one_a_tb_1` FOREIGN KEY (
    `one_id`
)
REFERENCES `one_q_tb` (
    `one_id`
);

ALTER TABLE `study_syllable_tb` ADD CONSTRAINT `FK_syllable_tb_TO_study_syllable_tb_1` FOREIGN KEY (
    `slb_id`
)
REFERENCES `syllable_tb` (
    `slb_id`
);

ALTER TABLE `study_syllable_tb` ADD CONSTRAINT `FK_user_tb_TO_study_syllable_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);

ALTER TABLE `study_object_tb` ADD CONSTRAINT `FK_object_tb_TO_study_object_tb_1` FOREIGN KEY (
    `obj_id`
)
REFERENCES `object_tb` (
    `obj_id`
);

ALTER TABLE `study_object_tb` ADD CONSTRAINT `FK_user_tb_TO_study_object_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);

ALTER TABLE `study_word_tb` ADD CONSTRAINT `FK_word_tb_TO_study_word_tb_1` FOREIGN KEY (
    `word_id`
)
REFERENCES `word_tb` (
    `word_id`
);

ALTER TABLE `study_word_tb` ADD CONSTRAINT `FK_user_tb_TO_study_word_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);

ALTER TABLE `study_sentence_tb` ADD CONSTRAINT `FK_sentence_tb_TO_study_sentence_tb_1` FOREIGN KEY (
    `stc_id`
)
REFERENCES `sentence_tb` (
    `stc_id`
);

ALTER TABLE `study_sentence_tb` ADD CONSTRAINT `FK_user_tb_TO_study_sentence_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);

ALTER TABLE `consultant_tag_tb` ADD CONSTRAINT `FK_tag_tb_TO_consultant_tag_tb_1` FOREIGN KEY (
    `tag_id`
)
REFERENCES `tag_tb` (
    `tag_id`
);

ALTER TABLE `consultant_tag_tb` ADD CONSTRAINT `FK_consultant_info_tb_TO_consultant_tag_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `consultant_info_tb` (
    `user_id`
);

ALTER TABLE `consultant_boundary_tb` ADD CONSTRAINT `FK_boundary_tb_TO_consultant_boundary_tb_1` FOREIGN KEY (
    `boundary_id`
)
REFERENCES `boundary_tb` (
    `boundary_id`
);

ALTER TABLE `consultant_boundary_tb` ADD CONSTRAINT `FK_consultant_info_tb_TO_consultant_boundary_tb_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `consultant_info_tb` (
    `user_id`
);

ALTER TABLE `user_authority` ADD CONSTRAINT `FK_authority_TO_user_authority_1` FOREIGN KEY (
    `authority_name`
)
REFERENCES `authority` (
    `authority_name`
);

ALTER TABLE `user_authority` ADD CONSTRAINT `FK_user_tb_TO_user_authority_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user_tb` (
    `user_id`
);

insert into tag_tb
values (1, '엄격한'), (2, '친근한'), (3, '친절한'), (4, '정적인'), (5, '발랄한'), (6, '활동적인');

insert into boundary_tb
values (1, '언어발달장애'), (2, '말소리장애'), (3, '신경언어장애'), (4, '유창성장애'), (5, '음성장애');

insert into syllable_tb
values  (1, '아'), (2, '애'), (3, '야'), (4, '어'), (5, '여'),
        (6, '오'), (7, '와'), (8, '왜'), (9, '요'), (10, '우'),
        (11, '워'), (12, '유'), (13, '으'), (14, '의');

insert into sentence_tb
values	(1, '안녕하세요. 반갑습니다.'),
          (2, '열쇠가 어디에 있어요?'),
          (3, '이 근처에 은행이 있어요?'),
          (4, '책상이 있습니까?'),
          (5, '책상이 큽니까, 작습니까?');

insert into word_tb
values	(1, '국물', '궁물'),
          (2, '쉬다', '쉬:다'),
          (3, '씻다', '씯따'),
          (4, '책상', '책쌍'),
          (5, '상자', '상자'),
          (6, '날씨', '날씨'),
          (7, '위치', '위치'),
          (8, '친절하다', '친절하다'),
          (9, '코끼리', '코끼리'),
          (10, '퇴근', '퇴:근');

insert into object_tb (obj_id, obj_name)
values  (1, "가방"), (2, "강아지"), (3, "고양이"), (4, "마이크"), (5, "고드름"),
        (6, "단추"), (7, "동전"), (8, "바나나"), (9, "바지"), (10, "버스"),
        (11, "사과"), (12, "지도"), (13, "선풍기"), (14, "고추장"), (15, "신발"),
        (16, "안경"), (17, "옷걸이"), (18, "자전거"), (19, "가위"), (20, "냉장고");

insert into authority(AUTHORITY_NAME)
values ('ROLE_USER');

insert into authority(AUTHORITY_NAME)
values ('ROLE_ADMIN');

insert into authority(AUTHORITY_NAME)
values ('ROLE_CONSULTANT');

INSERT INTO `user_tb` VALUES
    ('admin','{bcrypt}$2a$10$FPSljsxRYU0o7naE3wfVzOrakNeOU24ydZFuBAHTBWarcaNLgOD4m','김싸피','admin@ssafy.com','010-1111-1111',NULL,0,NULL,NULL,'ADMIN',0,1);


INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_NAME) values ('admin', 'ROLE_USER');