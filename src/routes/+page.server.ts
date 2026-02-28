import type { Blog } from "$lib/types";

export async function load() {
  let blogs: Blog[] = [];
  const paths = import.meta.glob("/src/routes/b/*/*.svx", {eager:true});

  for (const path in paths) {
    const slug = path.split("/").at(-2)?.replace(".svx", "");
    const file = paths[path];
    const metadata = file.metadata as Omit<Blog, "slug">;
    const blog = {...metadata, slug} satisfies Blog;
    blog.published && blogs.push(blog);
  }

  blogs = blogs.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  return { blogs };
}
