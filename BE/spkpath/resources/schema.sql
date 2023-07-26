CREATE DATABASE IF NOT EXISTS `spkpath`;

USE spkpath;

CREATE TABLE `user_tb` (
	`user_id`	char(20)	NOT NULL,
	`user_pwd`	varchar(30)	NOT NULL,
	`user_name`	char(10)	NOT NULL,
	`user_email`	varchar(30)	NOT NULL	COMMENT 'UNIQUE',
	`user_phone`	varchar(20)	NOT NULL,
	`user_info`	varchar(50)	NULL,
	`user_age`	int	NULL,
	`user_sex`	char(5)	NULL	COMMENT 'M/F',
	`user_pic`	varchar(120)	NULL	COMMENT '사진처리 어떻게 할건지',
	`user_grade`	varchar(10)	NOT NULL	DEFAULT '일반회원'	COMMENT '환자 / 상담사 / 관리자',
	`user_reward`	int	NOT NULL	DEFAULT 0	COMMENT 'default: 0'
);

CREATE TABLE `reservation_item_tb` (
	`rsv_item_id`	int	NOT NULL,
	`user_id`	char(20)	NOT NULL,
	`cslt_id`	char(20)	NOT NULL,
	`rsv_date`	date	NOT NULL,
	`rsv_time`	timestamp	NOT NULL,
	`rsv_status`	varchar(10)	NOT NULL	COMMENT '대기 / 거절 / 완료 / 취소',
	`rsv_info`	char(20)	NULL,
	`rsv_code`	char(20)	NOT NULL
);

CREATE TABLE `consultant_info_tb` (
	`user_id`	char(20)	NOT NULL,
	`cslt_team`	varchar(30)	NOT NULL,
	`cslt_exp`	int	NOT NULL,
	`cslt_tag`	varchar(80)	NOT NULL,
	`cslt_boundary`	varchar(80)	NOT NULL
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
	`obj_id`	int	NOT NULL	COMMENT 'auto_increment',
	`obj_name`	char(10)	NOT NULL,
	`obj_pic`	varchar(100)	NOT NULL
);

CREATE TABLE `proverb_tb` (
	`prv_id`	int	NOT NULL	COMMENT 'auto_increment',
	`prv_content`	char(50)	NOT NULL,
	`prv_ans`	char(25)	NOT NULL
);

CREATE TABLE `syllable_tb` (
	`slb_id`	int	NOT NULL	COMMENT 'auto_increment',
	`slb_content`	char(4)	NOT NULL
);

CREATE TABLE `study_syllable_tb` (
	`slb_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`study_slb_cnt`	int	NOT NULL	DEFAULT 1	COMMENT 'default: 1'
);

CREATE TABLE `study_object_tb` (
	`obj_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`study_obj_cnt`	int	NOT NULL	DEFAULT 1	COMMENT 'default: 1'
);

CREATE TABLE `study_proverb_tb` (
	`prv_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`study_prv_cnt`	int	NOT NULL	DEFAULT 1	COMMENT 'default: 1'
);

CREATE TABLE `study_word_tb` (
	`word_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`study_word_cnt`	int	NOT NULL	DEFAULT 1	COMMENT 'default: 1'
);

CREATE TABLE `word_tb` (
	`word_id`	int	NOT NULL	COMMENT 'auto_increment',
	`word_content`	varchar(30)	NOT NULL
);

CREATE TABLE `sentence_tb` (
	`stc_id`	int	NOT NULL	COMMENT 'auto_increment',
	`stc_content`	varchar(100)	NOT NULL
);

CREATE TABLE `study_sentence_tb` (
	`stc_id`	int	NOT NULL	COMMENT 'auto_increment',
	`user_id`	char(20)	NOT NULL,
	`study_stc_cnt`	int	NOT NULL	DEFAULT 1	COMMENT 'default: 1'
);

CREATE TABLE `consultant_available_date` (
	`상담일`	date	NOT NULL,
	`user_id`	char(20)	NOT NULL
);

CREATE TABLE `consultant_available_time` (
	`상담시간`	time	NOT NULL,
	`상담일`	date	NOT NULL
);

ALTER TABLE `user_tb` ADD CONSTRAINT `PK_USER_TB` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `reservation_item_tb` ADD CONSTRAINT `PK_RESERVATION_ITEM_TB` PRIMARY KEY (
	`rsv_item_id`
);

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

ALTER TABLE `object_tb` ADD CONSTRAINT `PK_OBJECT_TB` PRIMARY KEY (
	`obj_id`
);

ALTER TABLE `proverb_tb` ADD CONSTRAINT `PK_PROVERB_TB` PRIMARY KEY (
	`prv_id`
);

ALTER TABLE `syllable_tb` ADD CONSTRAINT `PK_SYLLABLE_TB` PRIMARY KEY (
	`slb_id`
);

ALTER TABLE `study_syllable_tb` ADD CONSTRAINT `PK_STUDY_SYLLABLE_TB` PRIMARY KEY (
	`slb_id`,
	`user_id`
);

ALTER TABLE `study_object_tb` ADD CONSTRAINT `PK_STUDY_OBJECT_TB` PRIMARY KEY (
	`obj_id`,
	`user_id`
);

ALTER TABLE `study_proverb_tb` ADD CONSTRAINT `PK_STUDY_PROVERB_TB` PRIMARY KEY (
	`prv_id`,
	`user_id`
);

ALTER TABLE `study_word_tb` ADD CONSTRAINT `PK_STUDY_WORD_TB` PRIMARY KEY (
	`word_id`,
	`user_id`
);

ALTER TABLE `word_tb` ADD CONSTRAINT `PK_WORD_TB` PRIMARY KEY (
	`word_id`
);

ALTER TABLE `sentence_tb` ADD CONSTRAINT `PK_SENTENCE_TB` PRIMARY KEY (
	`stc_id`
);

ALTER TABLE `study_sentence_tb` ADD CONSTRAINT `PK_STUDY_SENTENCE_TB` PRIMARY KEY (
	`stc_id`,
	`user_id`
);

ALTER TABLE `consultant_available_date` ADD CONSTRAINT `PK_CONSULTANT_AVAILABLE_DATE` PRIMARY KEY (
	`상담일`
);

ALTER TABLE `consultant_available_time` ADD CONSTRAINT `PK_CONSULTANT_AVAILABLE_TIME` PRIMARY KEY (
	`상담시간`
);

ALTER TABLE `reservation_item_tb` ADD CONSTRAINT `FK_user_tb_TO_reservation_item_tb_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_tb` (
	`user_id`
);

ALTER TABLE `reservation_item_tb` ADD CONSTRAINT `FK_consultant_info_tb_TO_reservation_item_tb_1` FOREIGN KEY (
	`cslt_id`
)
REFERENCES `consultant_info_tb` (
	`user_id`
);

ALTER TABLE `consultant_info_tb` ADD CONSTRAINT `FK_user_tb_TO_consultant_info_tb_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_tb` (
	`user_id`
);

ALTER TABLE `board_tb` ADD CONSTRAINT `FK_user_tb_TO_board_tb_1` FOREIGN KEY (
	`user_id2`
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

ALTER TABLE `comment_tb` ADD CONSTRAINT `FK_user_tb_TO_comment_tb_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_tb` (
	`user_id`
);

ALTER TABLE `one_q_tb` ADD CONSTRAINT `FK_user_tb_TO_one_q_tb_1` FOREIGN KEY (
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

ALTER TABLE `study_proverb_tb` ADD CONSTRAINT `FK_proverb_tb_TO_study_proverb_tb_1` FOREIGN KEY (
	`prv_id`
)
REFERENCES `proverb_tb` (
	`prv_id`
);

ALTER TABLE `study_proverb_tb` ADD CONSTRAINT `FK_user_tb_TO_study_proverb_tb_1` FOREIGN KEY (
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

ALTER TABLE `consultant_available_date` ADD CONSTRAINT `FK_consultant_info_tb_TO_consultant_available_date_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `consultant_info_tb` (
	`user_id`
);

ALTER TABLE `consultant_available_time` ADD CONSTRAINT `FK_consultant_available_date_TO_consultant_available_time_1` FOREIGN KEY (
	`상담일`
)
REFERENCES `consultant_available_date` (
	`상담일`
);