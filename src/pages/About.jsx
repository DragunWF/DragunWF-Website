import styles from "./About.module.css";
import Card from "../components/Card";
import Description from "../components/Description";
import Title from "../components/Title";

function About() {
  return (
    <div className={styles.wrapper}>
      <Card>
        <Title>Hobbies & Interests</Title>
        <Description textAlign="justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque odit,
          cupiditate blanditiis quis debitis provident? Expedita, quam non.
          Repellat accusantium quisquam maiores accusamus, provident aliquam,
          omnis commodi voluptatum repellendus nulla sequi quod perspiciatis
          veniam nemo velit nostrum sapiente unde vero ullam dolores ipsam hic.
          Ut fugiat officiis exercitationem aspernatur corrupti?
        </Description>
        <Description textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
          voluptate aperiam est inventore nisi, qui mollitia quibusdam fuga
          vitae atque ab! Iusto quia ex id dignissimos beatae maiores, at
          explicabo assumenda atque laboriosam, cum vero reprehenderit iste
          ipsam sit adipisci neque. Eligendi incidunt possimus nihil eius
          assumenda laboriosam deleniti itaque!
        </Description>
      </Card>
      <Card>
        <Title>Hackathons</Title>
        <Description textAlign="justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nemo
          eius at provident sed quisquam. Minima magni eum officia temporibus,
          fugit harum rem vel laudantium sit numquam aut. Repellendus deserunt
          asperiores mollitia quas ducimus nostrum et delectus totam? Sint,
          tempore? Fugit reiciendis non ut dolor, quas consequatur dolore nobis
          rem.
        </Description>
      </Card>
      <Card>
        <Title>Passion for Programming</Title>
        <Description textAlign="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          velit magnam ratione pariatur veritatis esse mollitia architecto
          molestiae placeat ad. Dolorum quis repudiandae inventore numquam a
          necessitatibus blanditiis neque labore?
        </Description>
      </Card>
      <span className={styles.bottomSpacing}></span>
    </div>
  );
}

export default About;
