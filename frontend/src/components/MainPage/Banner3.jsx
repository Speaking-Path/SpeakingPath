import styles from './Banner3.module.css'

const Banner3 = () => {
  return (
    <div>
      <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/main/002.jpg"} alt="" />
    </div>
  );
};

export default Banner3;
