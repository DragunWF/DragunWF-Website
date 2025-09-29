const isDevMode = import.meta.env.DEV;

export const backendUrl = isDevMode
  ? "http://127.0.0.1:8000"
  : "https://dashboard-dragunwf.onrender.com";
export const adminSiteUrl = `${backendUrl}/admin`;
export const blogPostApiUrl = `${backendUrl}/api/blog_posts`;
export const sendAnonymousMessageApiUrl = `${backendUrl}/api/send_anonymous_message`;

export const socialLinks = {
  github: "https://github.com/DragunWF",
  linkedin: "https://www.linkedin.com/in/marc-plarisan",
  itchio: "https://dragunwf.itch.io",
  typeracer: "https://data.typeracer.com/pit/profile?user=dragunwf",
  codewars: "https://www.codewars.com/users/DragunWF",
  steam: "https://steamcommunity.com/id/dragunwf",
};
export const pageLinks = {
  about: "/about",
  blog: "/blog",
  anonymousMessage: "/anonymous-message",
};
