import { getCollection } from "astro:content";

const articlesCollection = (
  await getCollection("articles", ({ data }) => {
    return data.isDraft !== true && new Date(data.publishedTime) < new Date();
  })
).sort((a, b) =>
  new Date(b.data.publishedTime)
    .toISOString()
    .localeCompare(new Date(a.data.publishedTime).toISOString())
);

export const articlesHandler = {
  allArticles: () => articlesCollection,

  mainHeadline: () => {
    // mainHeadline 플래그가 있는 글 우선, 없으면 최신 글 사용
    const article = articlesCollection.filter(
      (article) => article.data.isMainHeadline === true
    )[0] || articlesCollection[0];
    if (!article)
      throw new Error(
        "Please ensure there is at least one article."
      );
    return article;
  },

  subHeadlines: () => {
    const mainHeadline = articlesHandler.mainHeadline();
    // subHeadline 플래그가 있는 글 우선, 없으면 최신 글들 사용
    let subHeadlines = articlesCollection
      .filter(
        (article) =>
          article.data.isSubHeadline === true &&
          mainHeadline.id !== article.id
      )
      .slice(0, 4);

    // subHeadlines가 없으면 mainHeadline 제외한 최신 글들 사용
    if (subHeadlines.length === 0) {
      subHeadlines = articlesCollection
        .filter((article) => mainHeadline.id !== article.id)
        .slice(0, 4);
    }

    return subHeadlines;
  },
};
