"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  console.log("🚀 ~ Search ~ searchParams--1:", searchParams)
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`)
    const params = new URLSearchParams(searchParams)
    //设置查询参数
    params.set("page", "1")
    if (term) {
      //将搜索查询保存到URL
      params.set("query", term)
    } else {
      params.delete("query")
    }
    console.log(
      "🚀 ~ handleSearch ~ `${pathname}?${params.toString()}`:",
      `${pathname}?${params.toString()}`
    )
    //当需要在不刷新页面的情况下更新 URL 的查询参数时，适合使用这个方法。
    console.log("自动的更新url", `${pathname}?${params.toString()}`)
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
