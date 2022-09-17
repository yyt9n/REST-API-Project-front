// データ型を定義する
// 入力フォームのデータ型

export type AuthForm = {
    email: string,
    password: string
}

export type EditedTask = {
    id: number,
    title: string,
    description?: string | null
}