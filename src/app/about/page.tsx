import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "remembookの使い方 - AIで読書の理解を深める",
  description:
    "読書の理解度を高めるAI学習アプリ。要約作成、AI質問生成、スコアリング、最適なタイミングでの復習リマインドで、効率的な学習をサポートします。",
  openGraph: {
    title: "remembook - AIで読書の理解を深める",
    description:
      "読書の理解度を高めるAI学習アプリ。要約作成、AI質問生成、スコアリング、最適なタイミングでの復習リマインドで、効率的な学習をサポートします。",
    images: [{ url: "https://remembook.com/logo.svg" }],
    type: "website",
    siteName: "remembook",
    locale: "ja",
    url: "https://remembook.app",
  },
};

export default function AboutPage() {
  const features = [
    {
      id: 1,
      title: "学習したい本を検索",
      description: "書籍データベースから学習したい本を探します。",
      icon: "📚",
    },
    {
      id: 2,
      title: "メモを書く",
      description: "本の内容を自分の言葉でまとめます。",
      icon: "✍️",
    },
    {
      id: 3,
      title: "AIが質問を作成",
      description: "メモをもとに、GPT-4-miniが理解度を確認する質問を生成。",
      icon: "🤖",
    },
    {
      id: 4,
      title: "質問に回答し、スコア化",
      description:
        "text-embedding-3-smallが解答と過去のメモの類似度を分析し、スコアを算出。",
      icon: "📊",
    },
    {
      id: 5,
      title: "スコアに応じて復習をリマインド",
      description: "スコアに応じて、最適なタイミングでプッシュ通知を送信！",
      icon: "🔔",
    },
  ];

  const reminderScores = [
    { score: "50点未満", timing: "1日後", color: "bg-red-100 text-red-800" },
    {
      score: "50点~80点",
      timing: "3日後",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      score: "80点以上",
      timing: "1週間後",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              読書の理解を深める
              <br />
              <span className="text-blue-600">新しい学習体験</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              本を読んでも、すぐに内容を忘れてしまうことはありませんか？
              <br />
              「読んだときは理解できたのに、時間が経つと内容を思い出せない…」
              <br />
              そんな経験はありませんか？
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                remembookを始める
              </Link>
              <Link
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900">
                詳しく見る <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="relative w-full max-w-3xl sm:max-w-5xl lg:max-w-none">
              <Image
                src="/about-hero.webp"
                alt="読書とAIのイラスト"
                width={800}
                height={600}
                priority
                className="w-full h-auto max-w-[40rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:w-[30rem] md:w-[35rem] lg:w-[40rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              読書をアウトプットすることで、
              <br />
              知識の定着度が大きく向上します
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              でも、「アウトプットと言っても何をしていいか分からない」「復習のタイミングが分からない、面倒臭い」…
              <br />
              そんな悩みもありますよね。
              <br />
              そこで誕生したのが「remembook」です！
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              remembookの使い方
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AIを活用して、効率的に読書の理解度を高めましょう
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-start bg-white rounded-xl p-8 shadow-sm ring-1 ring-gray-200">
                  <div className="mb-6 rounded-lg bg-blue-600/10 p-4 text-3xl">
                    {feature.icon}
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.id}. {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    {feature.id === 1 && (
                      <div className="mt-6">
                        <Image
                          src="/about/search-book.png"
                          alt="本の検索画面"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {feature.id === 2 && (
                      <div className="mt-6">
                        <Image
                          src="/about/memo-book.png"
                          alt="要約作成画面"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {feature.id === 3 && (
                      <div className="mt-6">
                        <Image
                          src="/about/generate-question.png"
                          alt="AI質問生成画面"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {feature.id === 4 && (
                      <div className="mt-6">
                        <Image
                          src="/about/result.png"
                          alt="スコア結果画面"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {feature.id === 5 && (
                      <dl className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {reminderScores.map((item) => (
                          <div
                            key={item.score}
                            className={`rounded-lg ${item.color} p-6 text-center`}>
                            <dt className="text-lg font-semibold mb-2">
                              {item.score}
                            </dt>
                            <dd className="text-base">{item.timing}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              料金体系
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AIが生成した質問に回答する時1枚コインを消費します。
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="bg-white rounded-xl p-8 shadow-sm ring-1 ring-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Remembookコイン
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-gray-600">10枚セット：100円</p>
                  <p className="text-lg text-gray-600">
                    50枚セット：500円
                    <span className="text-blue-600 font-semibold ml-2">
                      （ボーナス5枚付与）
                    </span>
                  </p>
                  <p className="text-lg text-gray-600">
                    100枚セット：1,000円
                    <span className="text-blue-600 font-semibold ml-2">
                      （ボーナス10枚付与）
                    </span>
                  </p>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  ※ 決済にはStripeを利用しています
                  <br />※ コインの有効期限は有償/無償ともに180日間です
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              さあ、始めましょう
              <br />
              新しい読書習慣を。
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              remembookで、読書をより効果的な学習体験に変えませんか？
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                新規登録はこちら
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-white">
                ログインはこちら <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
