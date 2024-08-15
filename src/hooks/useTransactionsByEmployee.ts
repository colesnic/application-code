import { useCallback, useState } from "react"
import { RequestByEmployeeParams, Transaction } from "../utils/types"
import { TransactionsByEmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"
import { useAppContext } from "src/utils/context"

export function useTransactionsByEmployee(): TransactionsByEmployeeResult {
  const { fetchWithCache, fetchWithoutCache, loading } = useCustomFetch()
  const [transactionsByEmployee, setTransactionsByEmployee] = useState<Transaction[] | null>(null)
  const { useCache, setUseCache } = useAppContext()

  const fetchById = useCallback(
      async (employeeId: string) => {
        if (useCache) {
          const data = await fetchWithCache<Transaction[], RequestByEmployeeParams>(
            "transactionsByEmployee",
            {
              employeeId,
            }
          )

          setTransactionsByEmployee(data)
        } else {
          const data = await fetchWithoutCache<Transaction[], RequestByEmployeeParams>(
            "transactionsByEmployee",
            {
              employeeId,
            }
          )
          setUseCache(true)
          setTransactionsByEmployee(data)
        }
      },
      [fetchWithCache]
  )

  const invalidateData = useCallback(() => {
    setTransactionsByEmployee(null)
  }, [])

  return { data: transactionsByEmployee, loading, fetchById, invalidateData }
}
