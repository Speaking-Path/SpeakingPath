drop database spkpath;

CREATE DATABASE IF NOT EXISTS `spkpath`;

USE spkpath;

CREATE TABLE `user_tb` (
	`user_id`	char(20)	NOT NULL,
	`user_pwd`	varchar(100)	NOT NULL,
	`user_name`	char(10)	NOT NULL,
	`user_email`	varchar(30)	NOT NULL	COMMENT 'UNIQUE',
	`user_phone`	varchar(20)	NOT NULL,
	`user_info`	varchar(50)	NULL,
	`user_age`	int	NULL,
	`user_sex`	char(5)	NULL	COMMENT 'M/F',
	`user_pic`	varchar(120)	NULL	COMMENT '사진처리 어떻게 할건지',
	`user_grade`	varchar(10)	NOT NULL	DEFAULT '일반회원'	COMMENT '환자 / 상담사 / 관리자',
	`user_reward`	int	NOT NULL	DEFAULT 0	COMMENT 'default: 0',
	`activated`	boolean	NOT NULL	DEFAULT TRUE
);

CREATE TABLE `reservation_item_tb` (
	`rsv_item_id`	int primary key	NOT NULL auto_increment,
	`user_id`	char(20)	NOT NULL,
	`cslt_id`	char(20)	NOT NULL,
	`rsv_date`	date	NOT NULL,
	`rsv_time`	time	NOT NULL,
	`rsv_status`	varchar(10)	NOT NULL	COMMENT '대기 / 거절 / 완료 / 취소',
	`rsv_info`	varchar(80)	NULL,
	`rsv_code`	char(20)	NOT NULL
);

CREATE TABLE `consultant_info_tb` (
	`user_id`	char(20)	NOT NULL,
	`cslt_team`	varchar(50)	NOT NULL,
	`cslt_exp`	int	NOT NULL
);

CREATE TABLE `board_tb` (
	`board_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id2`	char(20)	NOT NULL,
	`board_title`	varchar(30)	NOT NULL,
	`board_content`	varchar(200)	NOT NULL,
	`board_hit`	int	NULL	DEFAULT 0	COMMENT 'default : 0',
	`board_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `comment_tb` (
	`comment_id`	int	NOT NULL	COMMENT 'auto_increment',
	`board_id`	int	NOT NULL	COMMENT 'PK',
	`comment_content`	varchar(100)	NOT NULL,
	`user_id`	char(20)	NOT NULL,
	`comment_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `one_q_tb` (
	`one_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`one_title`	varchar(100)	NOT NULL,
	`one_content`	varchar(200)	NOT NULL,
	`one_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `one_a_tb` (
	`answer_id`	int	NOT NULL	COMMENT 'auto_increment',
	`one_id`	int	NOT NULL	COMMENT 'auto_increment',
	`one_answer`	varchar(200)	NOT NULL,
	`one_created`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `object_tb` (
	`obj_id`	int	NOT NULL auto_increment primary key ,
	`obj_name`	char(10)	NOT NULL,
	`obj_pic`	varchar(100)	NOT NULL
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

-- ALTER TABLE `reservation_item_tb` ADD CONSTRAINT `PK_RESERVATION_ITEM_TB` PRIMARY KEY (
-- 	`rsv_item_id`
-- );

ALTER TABLE `consultant_info_tb` ADD CONSTRAINT `PK_CONSULTANT_INFO_TB` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `board_tb` ADD CONSTRAINT `PK_BOARD_TB` PRIMARY KEY (
	`board_id`
);

ALTER TABLE `comment_tb` ADD CONSTRAINT `PK_COMMENT_TB` PRIMARY KEY (
	`comment_id`,
	`board_id`
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

ALTER TABLE `comment_tb` ADD CONSTRAINT `FK_board_tb_TO_comment_tb_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `board_tb` (
	`board_id`
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





####################

insert into tag_tb
values (1, '엄격한'), (2, '친근한'), (3, '친절한'), (4, '정적인'), (5, '발랄한'), (6, '활동적인');

insert into boundary_tb
values (1, '언어발달장애'), (2, '말소리장애'), (3, '신경언어장애'), (4, '유창성장애'), (5, '음성장애');

insert into authority(AUTHORITY_NAME)
values ('ROLE_USER');

insert into authority(AUTHORITY_NAME)
values ('ROLE_ADMIN');

insert into authority(AUTHORITY_NAME)
values ('ROLE_CSLT');

insert into user_tb(`user_id`, `user_pwd`, `user_name`, `user_phone`, `user_email`, `user_info`, `user_age`, `user_sex`, `user_grade`)
values('ssafy', 'ssafy', '김싸피', '010-1234-5678', 'ssafy@ssafy.com', '안녕하세요', 20, 'M', 'user');

insert into user_tb(`user_id`, `user_pwd`, `user_name`, `user_phone`, `user_email`, `user_info`, `user_age`, `user_sex`, `user_grade`)
values('admin', 'admin', '김싸피', '010-1111-1111', 'admin@ssafy.com', '안녕하세요', 20, 'M', 'admin');


INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_NAME) values ('ssafy', 'ROLE_USER');
INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_NAME) values ('admin', 'ROLE_USER');
INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_NAME) values ('admin', 'ROLE_ADMIN');