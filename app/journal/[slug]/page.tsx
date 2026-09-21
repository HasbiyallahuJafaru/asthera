import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { Rail, Section } from "@/components/ui/Section";
import { articleGraph, breadcrumbGraph, pageMeta } from "@/lib/seo";
import { founder } from "@/lib/site";
import { getPost, getPostSlugs } from "@/sanity/queries";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post not found" };

  return pageMeta({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    path: `/journal/${post.slug}`,
    image: post.coverImage?.url ?? undefined,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt,
    noIndex: post.seo?.noIndex,
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />
      <JsonLd
        data={articleGraph({
          title: post.title,
          description: post.excerpt,
          path: `/journal/${post.slug}`,
          published: post.publishedAt,
          modified: post._updatedAt,
          image: post.coverImage?.url,
        })}
      />

      <Section as="div">
        <Rail className="py-16 lg:py-24">
        <article>
          <div className="mx-auto max-w-[46rem]">
            <time
              dateTime={post.publishedAt}
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>

            <h1 className="mt-5 text-balance text-[2.5rem] leading-[1.06] tracking-[-0.03em] text-text sm:text-[3rem]">
              {post.title}
            </h1>

            <p className="mt-7 text-lg leading-relaxed text-text-dim">{post.excerpt}</p>
            <p className="mt-6 text-sm text-text-faint">By {founder.name}</p>
          </div>

          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1480px) 1300px, 100vw"
              placeholder={post.coverImage.lqip ? "blur" : "empty"}
              blurDataURL={post.coverImage.lqip ?? undefined}
              className="my-14 aspect-[16/9] w-full rounded-card object-cover"
            />
          ) : (
            <div className="h-12" />
          )}

          <div className="mx-auto max-w-[46rem]">
            <RichText value={post.body} />

            <div className="mt-16 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-card rounded-bl-card bg-wash-green p-7 sm:p-9">
              <h2 className="text-xl tracking-tight text-text">Follow the mission</h2>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-text-dim">
                Training milestones and programme news, sent as they happen.
              </p>
              <NewsletterForm source={`post:${post.slug}`} />
            </div>

            <div className="mt-10">
              <Button href="/journal" variant="secondary">
                All posts
              </Button>
            </div>
          </div>
        </article>
      </Rail>
      </Section>
    </>
  );
}
