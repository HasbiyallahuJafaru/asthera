import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { getPosts } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Journal",
  description:
    "Project news, education programmes and writing from ASTHERA, the Nigerian space-intelligence company, and founder Fauziyya Auwal Muhammad.",
  path: "/journal",
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JournalPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Journal", path: "/journal" }])} />

      <PageHeader
        badge="Journal"
        title={
          <>
            News and <span className="accent-word">notes from the work</span>.
          </>
        }
        lede="Project updates, programmes for young people, and what we learn along the way. Subscribe to get new posts by email."
      >
        <div className="max-w-md">
          <NewsletterForm source="journal" />
        </div>
      </PageHeader>

      <Section>
        <Rail className="py-20 lg:py-28">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-card bg-surface px-8 py-16 text-center">
            <h2 className="text-xl tracking-tight text-text">No posts published yet</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-dim">
              The first mission updates land here as training begins. Subscribe above and you will
              get them as they go out.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
            {posts.map((post, index) => (
              <Reveal key={post._id} delay={(index % 3) * 0.06}>
                <article>
                  <Link href={`/journal/${post.slug}`} className="group block">
                    {post.coverImage?.url ? (
                      <div className="mb-5 overflow-hidden rounded-card bg-surface">
                        <Image
                          src={post.coverImage.url}
                          alt={post.coverImage.alt ?? ""}
                          width={800}
                          height={500}
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          placeholder={post.coverImage.lqip ? "blur" : "empty"}
                          blurDataURL={post.coverImage.lqip ?? undefined}
                          className="aspect-[8/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}

                    <time
                      dateTime={post.publishedAt}
                      className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint"
                    >
                      {formatDate(post.publishedAt)}
                    </time>

                    <h2 className="mt-3 text-xl leading-snug tracking-tight text-text transition-colors duration-200 group-hover:text-accent">
                      {post.title}
                    </h2>

                    <p className="mt-2.5 text-sm leading-relaxed text-text-dim">{post.excerpt}</p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Rail>
      </Section>
    </>
  );
}
