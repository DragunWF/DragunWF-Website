import styles from "./Blog.module.css";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";

function Blog() {
  return (
    <div className={styles.wrapper}>
      <BlogCard
        title="My Experience in Tagisan ng Talino 2025: Codefest National Level"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        molestiae alias perspiciatis sint ut quibusdam laudantium expedita vel
        vero repudiandae rerum, reiciendis culpa deserunt ducimus vitae odit in!
        Repellendus, neque."
      />
      <BlogCard
        title="My Experience in Tagisan ng Talino 2025: Codefest National Level"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        molestiae alias perspiciatis sint ut quibusdam laudantium expedita vel
        vero repudiandae rerum, reiciendis culpa deserunt ducimus vitae odit in!
        Repellendus, neque."
      />
      <BlogCard
        title="My Experience in Tagisan ng Talino 2025: Codefest National Level"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        molestiae alias perspiciatis sint ut quibusdam laudantium expedita vel
        vero repudiandae rerum, reiciendis culpa deserunt ducimus vitae odit in!
        Repellendus, neque."
      />
      <BlogPagination />
    </div>
  );
}

export default Blog;
