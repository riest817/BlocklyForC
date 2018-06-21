/* *************************************************************** *
 * 演算子順位法による構文解析                                      *
 *                                                                 *
 * 1+2*3 のような式を構文解析して、計算結果（この場合 7）を出力する *
 *                                                                 *
 * 表 (prec_table と op_index)と、                                 *
 * 還元規則 (reduce の補助関数の binary_op)を書き換えて            *
 * 使用してください。                                              *
 * *************************************************************** */

/* マクロの定義 --- 終端記号・非終端記号を表す定数を定義する */
/* ここからは終端記号、       */
#define BGN 256         /* 始 */
#define END 257         /* 終 */
#define NUM 258         /* 数値 */
#define TERM_MAX 258
/* ここからは非終端記号の定義 */
#define Expr 259

/* 字句解析部が返す ``属性'' (yylval) の型   *
 *  Yacc (Bison)と同じ形式にする。          */
typedef double YYSTYPE;  /* 使用するトークンの属性の型に応じて変更する。*/
extern YYSTYPE yylval;
/* 字句解析部に flex が生成する関数を用いる場合は、ここまでをヘッダーファ *
 * イルとして分離する。                                                  */

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <math.h>

YYSTYPE yylval;

/* *************************************************************** *
 * スタックの実装                                                  *
 * *************************************************************** */

struct _elem { /* スタックの要素の型 */
  int token;   /* トークンの種類、259 以上は非終端記号 */
  YYSTYPE val; /* 属性値 */
};

typedef struct _elem elem;

elem stack[64]; /* トイプログラムなのでとりあえずスタックの大きさは 64で十分 */

elem* sp = stack; /* 大域変数: スタックポインタ */

void push(int tok, YYSTYPE attr) { /* スタックにプッシュする。 */
  sp->token = tok;
  sp->val   = attr;
  sp++;  /* スタックは下に伸びることに注意 */
}

elem pop(void) { /* スタックをポップする。 */
  if (sp == stack) {
    printf("スタックが空です。\n");
    return *sp;
  } else {
    sp--;
    return *sp;
  }
}

void clear_stack(void) {
  sp = stack;
}

elem* topmost_token_aux(elem* ptr) { /* topmost_token の補助関数 */
  while (ptr->token > TERM_MAX) { /* ptr は非終端記号を指す */
    ptr--;
    if (ptr < stack) {
      printf("エラー: スタックには終端記号が入っていません。\n");
      return stack;
    }
  }
  /* ptr->token <= TERM_MAX */
  return ptr;
}

elem* topmost_token(void) { /* スタックの先頭の終端記号 */
  return topmost_token_aux(sp-1);
}

void debug_token(int t, YYSTYPE v) {
    switch (t) {
    case BGN:  printf("BGN"); break;
    case END:  printf("END"); break;
    case NUM:  printf("NUM_(%.3f)", v); break;
    case Expr: printf("Expr_(%.3f)", v); break;
    default:
      printf("'%c'", t); break;
    }
}

void debug_stack(void) { /* デバッグ用: スタックの中身を出力する */
  elem* sp0;

  printf("スタック 底 <<");
  printf("ああああ");
  for (sp0 = stack; sp0 < sp; sp0++) {
        int t =     sp0->token;
        YYSTYPE v = sp0->val;

        printf(" | ");
        debug_token(t, v);
  }
  printf(" >> 上\n");
}

/* *************************************************************** *
 * 字句解析部 （flex が生成する関数に置き換えても良い。）           *
 * *************************************************************** */

int yylex(void) { /* 入力の次のトークンを返す。 */
  int c;

  do {
    c = getchar();
  } while (c == ' ' || c == '\t');  /* 空白を読みとばす */

  if (isdigit(c) || c == '.') {
    ungetc(c, stdin);
    scanf("%lf", &yylval);
    /* ``値''は yylvalという変数に代入して返す。*/
    return NUM;
    /* NUMというトークンを返す。*/
  } else if (c == '\n') {
    return END; /* 終りの記号 */
  } else if (c == EOF) {
    exit(0);  /* プログラムの終了 */
  }
  /* 上のどの条件にも合わなければ、文字をそのまま返す。*/
  return c;
}

/* *************************************************************** *
 * 構文解析部                                                      *
 *                                                                 *
 *   Expr -> NUM                                                   *
 *         | '(' Expr ')'                                          *
 *         | Expr '+' Expr                                         *
 *         | Expr '*' Expr                                         *
 * *************************************************************** */

/* *************************************************************** *
 * 演算子順位表の表現    必要に応じて変更する                      *
 * *************************************************************** */
#define LT 0    /* <, Less Than */
#define EQ 1    /* =, Equal */
#define GT 2    /* >, Greater Than */
#define ERR 3   /* エラー, Error */

int op_index(elem* p) { /* 表を引きやすいように連続した数値に写す。*/
  switch (p->token) {
  case BGN:  return 0;
  case '<':  return 1;
  case '+':  return 2;
  case '-':  return 3;
  case '*':  return 4;
  case '/':  return 5;
  case '^':  return 6;
  case '(':  return 7;
  case ')':  return 8;
  case NUM:  return 9;
  case END:  return 10;
  default:   printf("op_index: 不正な構文要素 (");
             debug_token(p->token, p->val);
             printf(")。\n");
             exit(1);
             return 0;
  }
}

char prec_table[10][10] = { /* 演算子順位表本体 */
  /* 行に END がないこと、列に BGN がないことに注意。*/
          /* '<',  '+',  '-',  '*',  '/',  '^',  '(',  ')',  NUM,  END */
  /* BGN */ {LT,   LT,   LT,   LT,   LT,   LT,   LT,   ERR,  LT,   EQ   },
  /* '<' */ {ERR,  LT,   LT,   LT,   LT,   LT,   LT,   GT,   LT,   GT   },
  /* '+' */ {GT,   GT,   GT,   LT,   LT,   LT,   LT,   GT,   LT,   GT   },
  /* '-' */ {GT,   GT,   GT,   LT,   LT,   LT,   LT,   GT,   LT,   GT   },
  /* '*' */ {GT,   GT,   GT,   GT,   GT,   LT,   LT,   GT,   LT,   GT   },
  /* '/' */ {GT,   GT,   GT,   GT,   GT,   LT,   LT,   GT,   LT,   GT   },
  /* '^' */ {GT,   GT,   GT,   GT,   GT,   LT,   LT,   GT,   LT,   GT   },
  /* '(' */ {LT,   LT,   LT,   LT,   LT,   LT,   LT,   EQ,   LT,   ERR  },
  /* ')' */ {GT,   GT,   GT,   GT,   GT,   GT,   ERR,  GT,   ERR,  GT   },
  /* NUM */ {GT,   GT,   GT,   GT,   GT,   GT,   ERR,  GT,   ERR,  GT   },
};


/* 演算子順位表を利用する補助関数 */
int prec(elem* left, elem* right) {
  /* left と right の関係を prec_table から引く。 */
  return prec_table[op_index(left)][op_index(right) - 1];
}

elem* handle_left(void) { /* 還元が起こる記号の列の左端を見つける */
  elem* next;
  elem* cur = topmost_token(); /* スタックのトップの終端記号の位置 */

  while (1) {
    next = topmost_token_aux(cur - 1); /* 次の終端記号の位置 */
    if (prec(next, cur) == LT) {
      return next + 1; /* next の手前が求める場所 */
    } else { /* EQ */
      cur = next;
    }
  }
}

/* *************************************************************** *
 * 構文規則の表現   必要に応じて変更する                           *
 * *************************************************************** */

YYSTYPE binary_op(YYSTYPE left, int op, YYSTYPE right) {
   printf("   還元: Expr -> Expr ");  debug_token(op, 0);  printf(" Expr\n");
   switch (op) {
   case '<':
     return left < right;
   case '+':
     return left + right;
   case '-':
     return left - right;
   case '*':
     return left * right;
   case '/':
     return left / right;
   case '^':
     return pow(left, right);
   default:
     printf("処理できない二項演算子: "); debug_token(op, 0); printf("\n");
     exit(7);
     return 0;
   }
}

int reduce(void) {  /* 還元処理 */
  elem* left = handle_left();   /* 還元する部分の左端を見つける */
  int num = sp - left;          /* 還元する記号列の長さ */
  /* printf("reduce:\t"); */

  switch (num) {                /* どの規則で還元するか? */
  case 1: {
    elem data = pop();
    if (data.token == NUM) {
      /* Expr -> NUM */
      printf("   還元: Expr -> NUM_(%.3f)\n", data.val);
      push(Expr, data.val);        /* ポップしてすぐプッシュ */
      break;
    } else {
      printf("reduce: 不正なオペランド (");
      debug_token(data.token, data.val);
      printf(")。\n");
      exit(2);
    }
  }
  case 2: {
    elem data2 = pop(); elem data1 = pop();
    printf("reduce: 不正な式 (");
    debug_token(data1.token, data1.val);
    printf(",");
    debug_token(data2.token, data2.val);
    printf(")。\n");
    exit(3);
  }
  case 3: {
    elem data3 = pop(); elem data2 = pop(); elem data1 = pop();
    if (data1.token == '(' && data2.token == Expr && data3.token == ')') {
      /* Expr -> '(' Expr ')' */
      printf("   還元: Expr -> ( Expr )\n");
      yylval = data2.val;
      push(Expr, yylval);
    } else if (data1.token == Expr && data3.token == Expr) {
      /* 二項演算子 */
      yylval = binary_op(data1.val, data2.token, data3.val);
      push(Expr, yylval);
    } else {
      printf("reduce: 不正な式 (");
      debug_token(data1.token, data1.val);
      printf(",");
      debug_token(data2.token, data2.val);
      printf(",");
      debug_token(data3.token, data3.val);
      printf(")。\n");
      exit(4);
    }
    break;
  }
  default:
    printf("reduce: 構文エラー\n");
    exit(5);
  }
  debug_stack();
  return 0;
}

/* *************************************************************** *
 * 構文解析関数本体                                                *
 * *************************************************************** */
int yyparse(void) {
  elem* top;
  elem next;
  char relation; /* 関係 */

  push(BGN, 0 /* 0 はダミー */); /* 始記号をスタックに積んでおく */
  next.token = yylex(); /* 入力の最初のトークン */
  next.val   = yylval;
  debug_stack();
  while (1) {
    top = topmost_token();  /* スタックのトップの終端記号 */

    printf("   ");
    debug_token(top->token, top->val);
    printf(" と ");
    debug_token(next.token, next.val);
    printf(" を比較: ");

    if (next.token == END && top->token == BGN) {
      printf("   シフト\n"); /* デバッグ用 */
      push(next.token, 0 /* ダミー */);
      debug_stack();
      printf("   終了\n"); /* デバッグ用 */
      clear_stack();
      return 0; /* 成功で終了 */
    }

    relation = prec(top, &next);
    if (relation == LT || relation == EQ) {     /* シフト */
      printf("   シフト\n"); /* デバッグ用 */
      push(next.token, next.val);
      debug_stack();
      next.token = yylex();    /* 次のトークンを読み込む */
      next.val   = yylval;
      /* printf ("\ntoken=%d\n", next.token); *//* デバッグ用 */
    } else if (relation == GT) {                /* 還元 */
      if (reduce()) { /* 0 以外は構文エラー */
        return 1;
      }
    } else { /* 表の空欄部分 --- エラー */
      printf("yyparse: 不正な先読み (");
      debug_token(next.token, next.val);
      printf(")。\n");
      exit(6);
    }
  }
}

int main(void) {
  while (1) {
    if (yyparse() == 0) { /* 0 は正常終了 */
      printf("   答: %g\n", yylval);
    }
  }

  return 0;
}
