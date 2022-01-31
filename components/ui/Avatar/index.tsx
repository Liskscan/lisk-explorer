import { FC, useEffect } from "react"
import { sha256 } from "js-sha256"
import {
  Gradients,
  gradientSchemes,
} from "components/ui/Avatar/AvatarGradients"
import { useWatchAccount } from "@moosty/use-accounts"
import { AccountDataType } from "@moosty/lisk-service-provider"

export const Avatar: FC<{
  address: string
  size: number
  uniqueSvgUrlHash?: any
  className?: string
  username?: boolean
  circle?: boolean
  collectible?: boolean
}> = ({
  address,
  size,
  uniqueSvgUrlHash = "liskScan",
  className,
  username,
  circle,
  collectible,
}) => {
  const { account, setAccount } = useWatchAccount({} as AccountDataType)

  useEffect(() => {
    if (address && username && !account?.summary) {
      setAccount!(address)
    }
  }, [address, username, account, setAccount])

  const computeShapesAndGradients = (newSize: number): any => {
    const addressHashChunks = getHashChunks(address)
    const gradientScheme =
      gradientSchemes[
        // @ts-ignore
        addressHashChunks[0].substr(1, 2) % gradientSchemes.length
      ]

    const gradientsSchemesUrlsHashed = {
      // @ts-ignore
      primary: pickTwo(addressHashChunks[1], gradientScheme.primary).map(
        replaceUrlByHashOnScheme.bind(null, uniqueSvgUrlHash),
      ),
      // @ts-ignore
      secondary: pickTwo(addressHashChunks[2], gradientScheme.secondary).map(
        replaceUrlByHashOnScheme.bind(null, uniqueSvgUrlHash),
      ),
    }

    const shapes = [
      getBackgroundCircle(newSize, gradientsSchemesUrlsHashed.primary[0]),
      getShape(
        // @ts-ignore
        addressHashChunks[1],
        newSize,
        gradientsSchemesUrlsHashed.primary[1],
        1,
      ),
      getShape(
        // @ts-ignore
        addressHashChunks[2],
        newSize,
        gradientsSchemesUrlsHashed.secondary[0],
        0.23,
      ),
      getShape(
        // @ts-ignore
        addressHashChunks[3],
        newSize,
        gradientsSchemesUrlsHashed.secondary[1],
        0.18,
      ),
    ]

    return [shapes, gradientsSchemesUrlsHashed]
  }

  const [shapes, gradientsSchemesUrlsHashed] = computeShapesAndGradients(size)

  return (
    <>
      {/*{!username && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      height: size,*/}
      {/*      width: size,*/}
      {/*    }}*/}
      {/*    className={`rounded-full transform ease-in-out duration-500 hover:scale-150 hover:skew-y-8 hover:skew-x-4 ${className} `}*/}
      {/*  >*/}
      {/*    <svg*/}
      {/*      height={size}*/}
      {/*      width={size}*/}
      {/*      className={"rounded-full overflow-hidden inline-block"}*/}
      {/*    >*/}
      {/*      <Gradients scheme={gradientsSchemesUrlsHashed} />*/}
      {/*      {shapes.map((shape: any, i: any) => (*/}
      {/*        <shape.component {...shape.props} key={i} />*/}
      {/*      ))}*/}
      {/*    </svg>*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className={"flex flex-row "}>
        <div
          style={{
            height: collectible ? "100%" : size,
            width: collectible ? "100%" : size,
          }}
          className={`${
            !circle ? "rounded" : "rounded-full"
          } inline-block transform ease-in-out duration-500  ${className} `}
        >
          <svg
            viewBox={`0 0 ${size} ${size}`}
            height={"100%"}
            width={"100%"}
            className={`${!circle ? "rounded" : "rounded-full"}`}
          >
            <Gradients scheme={gradientsSchemesUrlsHashed} />
            {shapes.map((shape: any, i: any) => (
              <shape.component {...shape.props} key={i} />
            ))}
          </svg>
        </div>
        <div>{account?.summary?.username}</div>
      </div>
    </>
  )
}

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

/*
 * Account Visual
 *
 * The account visual is an svg image generated based on account address.
 *
 * The account visual randomly selects one of 8 color schemes defined in ./gradients
 * Each color scheme consists of
 * - 2 primary colors for the 2 big shapes,
 * - 4 secondary colors for the 2 small shapes
 *
 *
 * It contains 4 shapes (in this order from background to foreground):
 * - Circle of size 1 and random primary color
 * - A random shape of base size 1 of primary color other then previous
 * - A random shape of base size 0.23 and one secondary color
 * - A random shape of base size 0.18 and other secondary color
 *
 * The base size of random shapes is multiplied by a random scale factor
 * from range 1.2, 1.3, ..., 2.0, 2.1
 *
 * Possible shapes are: Square, Triangle, Circle
 *
 * Each shape is randomly rotated around the center of the account visual.
 *
 * Randomness of each step is defined by a part of decimal represendation of sha256 hash of address.
 * If there are 10 options to choose from then 1 digit is used.
 * If there are 3 or 4 options to choose from then 2 digits is used
 * to give more even distribution, because e.g. with 1 digit and 3 options
 * the first option has 4/10 chance and each of other two has 3/10 chance.
 */

const Rect = (props: any) => <rect {...props} />
const Circle = (props: any) => <circle {...props} />
const Polygon = (props: any) => <polygon {...props} />

const computeTriangle = (props: any) => ({
  points: [
    {
      x: props.x,
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 4,
    },
    {
      x: props.x + props.size / 4,
      y: props.y + props.size,
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(" "),
})

const computePentagon = (props: any) => ({
  points: [
    {
      x: round(props.x + props.size / 2),
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 2.5,
    },
    {
      x: round(props.x + (props.size - props.size / 5)),
      y: props.y + props.size,
    },
    {
      x: round(props.x + props.size / 5),
      y: props.y + props.size,
    },
    {
      x: props.x,
      y: round(props.y + props.size / 2.5),
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(" "),
})

const getShape = (chunk: any, size: number, gradient: any, sizeScale = 1) => {
  const shapeNames = ["circle", "triangle", "square"]

  const sizes = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map((x) =>
    round(x * size * sizeScale),
  )

  const coordinates = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    (x) => x * (size / 40),
  )

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + sizes[chunk[3]] / 2,
        cy: coordinates[chunk[2]] + sizes[chunk[3]] / 2,
        r: sizes[chunk[3]] / 2,
      },
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]],
      },
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]],
      },
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
  }

  return {
    component:
      // @ts-ignore

      shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].component,
    props: {
      // @ts-ignore
      ...shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].props,
      fill: gradient.url,
      transform: `rotate(${chunk.substr(1, 2) * 3.6}, ${size / 2}, ${
        size / 2
      })`,
    },
  }
}

const getBackgroundCircle = (size: number, gradient: any) => ({
  component: Rect,
  props: {
    x: 0,
    y: 0,
    height: size,
    width: size,
    fill: gradient.url,
  },
})

const pickTwo = (chunk: any, options: any) => [
  options[chunk.substr(0, 2) % options.length],
  options[
    (chunk.substr(0, 2) - 0 + 1 + (chunk.substr(2, 2) % (options.length - 1))) %
      options.length
  ],
]

const getHashChunks = (address: string) => {
  return BigInt(`0x${sha256(address || "0")}`)
    .toString()
    .substr(2)
    .match(/\d{5}/g)
}

// @ts-ignore
function replaceUrlByHashOnScheme(uniqueSvgUrlHash, gradientScheme) {
  const id = `${gradientScheme.id}-${uniqueSvgUrlHash}`
  return {
    ...gradientScheme,
    id,
    url: `url(#${id})`,
  }
}

export default Avatar
