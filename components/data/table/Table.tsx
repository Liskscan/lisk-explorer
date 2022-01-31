import { FC } from "react"
import { Column, HeadColumn, Button } from "@Components"
import { TableColProp, TableProps } from "@Types"

export const Table: FC<TableProps> = ({
  button,
  className,
  rows,
  cols,
  oddClassName = `bg-background text-onSurface`,
  evenClassName = `bg-surfaceLight text-onSurface`,
  hoverClassName = `hover:bg-surfaceDark hover:text-onSurface`,
  headClassName = `bg-surfaceDark text-onSurfaceDark`,
  emptyTable,
}) => {
  return (
    <div className={["flex flex-col my-4 ", className].join(" ")}>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" overflow-hidden  sm:rounded">
            <table className="min-w-full rounded ">
              <thead className={`rounded font-bold  `}>
                <tr className="tableHead ">
                  {cols?.map((col, iterator) => {
                    return (
                      <HeadColumn
                        text="text-primary"
                        key={`head-${col.value}-${iterator}`}
                        style={{
                          width: col.width ? col.width : "auto",
                          ...col.style,
                        }}
                        {...col}
                        className={[
                          "",
                          "tableHeadColumn",
                          col.className,
                          headClassName,
                        ].join(" ")}
                      />
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, y) => (
                  <tr
                    className={[
                      "tableRow",
                      hoverClassName,
                      y % 2 === 1 ? oddClassName : evenClassName,
                      y % 2 === 1 ? "tableRowOdd" : "tableRowEven",
                    ].join(" ")}
                    key={`${row.id ? row.id : `uni-${y}`}`}
                  >
                    {row?.cols?.map((col: TableColProp, i: number) => (
                      <Column
                        key={`${row.id ? `${row.id}-${i}` : `uni-${y}-${i}`}`}
                        {...col}
                        bg={""}
                        text={""}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows?.length === 0 && (
              <div className="font-bold text-center text-onSurfaceLight  py-4">
                {emptyTable || "No data found"}
              </div>
            )}
          </div>
        </div>
      </div>

      {button && (
        <div className={["mx-auto block w-full text-center p-2 "].join(" ")}>
          <Button
            className={
              "rounded text-onBackgroundMedium bg-background p-4 shadow-1 hover:text-onPrimaryHigh hover:bg-primaryLight hover:shadow-none"
            }
            fullWidth
            onClick={button.onClick}
            value={button.label}
          />
        </div>
      )}
    </div>
  )
}
