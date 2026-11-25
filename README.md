# Everyday Wonder, Two Days to Find the Line

[![Competition](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)
[![Rank](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/lerrboyy/everyday-wonder/rank.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)
[![Reward](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/lerrboyy/everyday-wonder/reward.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)

One sentence, up to 200 characters, on a small moment of wonder in everyday life — an entry for the [Everyday Wonder, Two Days to Find the Line](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3) bounty on [make.fun](https://make.fun).

## The entry

> The old man at the bus stop feeds the same stray cat every morning, and the cat waits for him like a train that is always, miraculously, on time.

145 characters, one line, one sentence.

## The angle

A real daily ritual — an old man feeding the same stray cat at a bus stop every morning — turned strange by a comparison nobody has met before: the cat waits for him like a train. Then the last clause flips it: the train, which is supposed to keep time and never does, is outdone by a stray animal that owes nobody anything and always arrives. The wonder is not in the cat or the man, but in the fact that the most reliable thing in the morning is a stray.

## How it runs

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it — Unicode code-point count within the 1–200 gate, single line, no leading/trailing whitespace, no control characters, exactly one sentence — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies it byte-for-byte before printing success.

```sh
OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
