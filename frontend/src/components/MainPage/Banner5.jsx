import styles from './Banner3.module.css'

const Banner5 = () => {
  return (
    <div>
      <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/main/006.jpg"} alt="" />
    </div>
  );
};

export default Banner5;
